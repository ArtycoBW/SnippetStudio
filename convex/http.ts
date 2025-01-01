import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import { api, internal } from "./_generated/api"

const http = httpRouter()

// http.route({
//   path: "/lemon-squeezy-webhook",
//   method: "POST",
//   handler: httpAction(async (ctx, request) => {
//     const payloadString = await request.text()
//     const signature = request.headers.get("X-Signature")

//     if (!signature) {
//       return new Response("Missing X-Signature header", { status: 400 })
//     }

//     try {
//       const payload = await ctx.runAction(internal.lemonSqueezy.verifyWebhook, {
//         payload: payloadString,
//         signature,
//       })

//       if (payload.meta.event_name === "order_created") {
//         const { data } = payload

//         const { success } = await ctx.runMutation(api.users.upgradeToPro, {
//           email: data.attributes.user_email,
//           lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
//           lemonSqueezyOrderId: data.id,
//           amount: data.attributes.total,
//         })

//         if (success) {
//           // optionally do anything here
//         }
//       }

//       return new Response("Webhook processed successfully", { status: 200 })
//     } catch (error) {
//       console.log("Webhook error:", error)
//       return new Response("Error processing webhook", { status: 500 })
//     }
//   }),
// });

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error("Отсутствует переменная окружения CLERK_WEBHOOK_SECRET")
    }

    const svix_id = request.headers.get("svix-id")
    const svix_signature = request.headers.get("svix-signature")
    const svix_timestamp = request.headers.get("svix-timestamp")

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Произошла ошибка - нет заголовков svix", {
        status: 400,
      })
    }

    const payload = await request.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(webhookSecret)
    let evt: WebhookEvent

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Ошибка при проверке вебхука:", err)
      return new Response("Произошла ошибка", { status: 400 })
    }

    const eventType = evt.type
    if (eventType === "user.created") {
      // сохранить пользователя в convex (бд)
      const { id, email_addresses, first_name, last_name } = evt.data

      const email = email_addresses[0].email_address
      const name = `${first_name || ""} ${last_name || ""}`.trim()

      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.log("Ошибка при создании пользователя:", error);
        return new Response("Ошибка при создании пользователя", { status: 500 })
      }
    }

    return new Response("Веб-крючок успешно обработан", { status: 200 })
  }),
})

export default http