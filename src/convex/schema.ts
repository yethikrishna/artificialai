import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema(
  {
    // Add your custom tables here
    // Example:
    // messages: defineTable({
    //   content: v.string(),
    //   author: v.string(),
    //   timestamp: v.number(),
    // }).index("by_timestamp", ["timestamp"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;