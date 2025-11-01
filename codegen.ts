import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://rickandmortyapi.com/graphql",
  documents: "./src/graphql/**/*.graphql",
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        gqlTagName: "gql",
        skipTypename: false,
        useTypeImports: true,
      },
    },
  },
};

export default config;
