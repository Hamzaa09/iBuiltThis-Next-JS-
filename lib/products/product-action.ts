"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { FormState } from "@/types";
import { and, eq, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const submitProduct = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    //validate the data
    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    //transform the data
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: undefined,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check the form.",
      };
    }

    return {
      success: false,
      errors: undefined,
      message: "Failed to submit product",
    };
  }
};

export const upVote = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, voteCount + 1)`,
      })
      .where(and(eq(products.id, productId), ne(products.userId, userId)));

    revalidatePath("/");

    return {
      succes: true,
      message: "Updated Successfully!",
    };
  } catch (err) {
    console.log(err);
    return {
      succes: false,
      message: "Failed to upvote",
      voteCount: 0,
    };
  }
};

export const downVote = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count - 1)`,
      })
      .where(and(eq(products.id, productId), ne(products.userId, userId)));

    revalidatePath("/");
    return {
      succes: true,
      message: "Updated Successfully!",
    };
  } catch (err) {
    console.log(err);
    return {
      succes: false,
      message: "Failed to downvote",
      voteCount: 0,
    };
  }
};
