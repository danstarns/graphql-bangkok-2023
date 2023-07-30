import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";

export const upperCaseDirective = {
  typeDefs: `directive @upperCase on FIELD_DEFINITION`,
  transformer: (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, "upperCase")?.[0];
        if (!directive) {
          return;
        }

        const { resolve = defaultFieldResolver } = fieldConfig;

        return {
          ...fieldConfig,
          resolve: async function (source, args, context, info) {
            const result = await resolve(source, args, context, info);

            if (typeof result === "string") {
              return result.toUpperCase();
            }

            return result;
          },
        };
      },
    });
  },
};
