// src/inngest/functions.ts
import { inngest } from "./client";
import { prisma } from "../db";

// Inngest function to save user data in database
// export const syncUserCreation = inngest.createFunction(
//   {id: 'sync-user-create'},
//   {event: 'clerk/user.created'},
//   async ({ event }) => {
//     const {data} = event;
//     await prisma.user.create({
//       data: {
//         id: data.id,
//         email: data.email_addresses[0].email_address,
//         name: `${data.first_name} ${data.last_name}`,
//         image: data.image_url,
//       }
//     })
//   }
// )

// Inngest function to save user data in database
export const syncUserCreation = inngest.createFunction(
  {id: 'sync-user-create', triggers: {event: 'clerk/user.created'}},
  async ({ event }) => {
    const {data} = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      }
    })
  }
)

// Inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
  {id: 'sync-user-update', triggers: {event: 'clerk/user.updated'}},
  async ({ event }) => {
    const {data} = event;
    await prisma.user.update({
      where: {id: data.id},
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      }
    })
  }
)

// Inngest function to delete user data in database
export const syncUserDeletion = inngest.createFunction(
  {id: 'sync-user-delete', triggers: {event: 'clerk/user.deleted'}},
  async ({ event }) => {
    const {data} = event;
    await prisma.user.delete({
      where: {id: data.id}
    })
  }
)



// export const processTask = inngest.createFunction(
//   { id: "process-task", triggers: { event: "app/task.created" } },
//   async ({ event, step }) => {
//     const result = await step.run("handle-task", async () => {
//       return { processed: true, id: event.data.id };
//     });

//     await step.sleep("pause", "1s");

//     return { message: `Task ${event.data.id} complete`, result };
//   }
// );