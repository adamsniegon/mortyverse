import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: "./src/graphql/**/*.graphql",
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      config: {
        gqlTagName: "gql",
        skipTypename: false,
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
