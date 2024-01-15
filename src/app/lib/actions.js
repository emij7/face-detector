import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

export async function authenticate(prevState, formData) {
  console.log(formData);
  console.log(prevState);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// const RegisterFormSchema = z.object({
//   id: z.string(),
//   name: z.string({
//     invalid_type_error: "Please provide a name.",
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: "Please enter an amount greater than $0." }),
//   status: z.enum(["pending", "paid"], {
//     invalid_type_error: "Please select an invoice status.",
//   }),
//   date: z.string(),
// });

// export async function registerUser(prevState, formData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split("T")[0];

//   // Test it out:
//   //   console.log(amountInCents);
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//       `;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to Create Invoice.",
//     };
//   }
//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }
