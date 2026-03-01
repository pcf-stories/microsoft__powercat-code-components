---
applyTo: "Storybook/stories/**/*.ts, Storybook/stories/**/*.tsx"
---

# @shko.online/componentframework-mock

> Mocking library to help with testing `PowerApps Component Framework` Components (`PCF` , aka. `Code Components`)

This library provides classes that simplify executing `PCF` components in a test environment by providing a `Sinon` powered `Fake` implementation of `ComponentFramework` contenxt and system events. 

## Table of contents

- [Usage](#usage)
  - [Story Setup](#story-setup)
- [API Reference](@shko.online/ComponentFramework-Mock.API#api-reference)
  - [Classes](@shko.online/ComponentFramework-Mock.API#classes)
    - [ComponentFrameworkMockGenerator](#componentframeworkmockgenerator)
    - [ComponentFrameworkMockGeneratorReact](#componentframeworkmockgeneratorreact)
    - [ComponentFrameworkMockOrchestrator](#componentframeworkmockorchestrator)
  - [Interfaces](#interfaces)
  - [Constants](#constants)

## Usage

There are three main classes in this library that can be used to create a mock context for testing `PCF` components:
1. `ComponentFrameworkMockGenerator`: This class generates a mock context for a single standard `PCF` component based on the provided configuration.
2. `ComponentFrameworkMockGeneratorReact`: This class generates a mock context for a virtual `PCF` component that uses `React` based on the provided configuration.
3. `ComponentFrameworkMockOrchestrator`: This class orchestrates the generation of mock contexts for multiple components, allowing you to manage and execute tests across different components in a unified manner.

To use these classes, you can follow the examples provided in the [API Reference](@shko.online/ComponentFramework-Mock.API#api-reference) section below. Each class has its own set of methods and properties that allow you to customize the mock context according to your testing needs.

## Story Setup

When creating a new story for a component, you need to first check if the `component folder` containing the `packages.json` is already setup in the project npm workspace. If not add the component as a new workspace by adding the following to the root `package.json`:

```json
"workspaces": [
    "{Relative Path to Component Folder}"
]
``` 

make sure to run `npm install` after modifying the workspaces to ensure the new workspace is properly linked.

make sure to run `npm run refreshTypes` after modifying the workspaces to ensure the new component types are properly refreshed.

Always read the `ControlManifest.Input.xml` file of the component to understand the expected inputs, outputs, and resources as this will help you set up the mock context correctly. From this file you can determine the `IInputs` and `IOutputs` types, as well as any `resx` or `css` that need to be loaded for the component. From `ControlManifest.Input.xml` you can also determine if the component uses `React` (defined by `control-type="virtual"`) or not which will help you decide which mock generator class to use. You should always tell the user which mock generator class you decided to use based on the `control-type` defined in the `ControlManifest.Input.xml` file.

check if the Storybook component bridge file is set up. If not, create a new file in the `Storybook/Stories/Components` folder named `{ComponentName}.ts` and add the following code:

if a `resx` file is used by the component, make sure to load it using the `getFromResource` function exported from the component bridge file as shown below:

```ts
import resource from "raw-loader!!{Relative Path to resx file}";
import { generateGetFromResource } from "../getFromResourceGenerator";

export const getFromResource = generateGetFromResource(resource);
```

also always make sure to export the component and its types from the bridge file as shown below:

```ts
export { ComponentName } from "Relative Path to Component Entry Point";
export type { IInputs, IOutputs } from "Relative Path to ManifestTypes";

```

if the component is a standard component use the `ComponentFrameworkMockGenerator` class to create a render function for the story as shown in the [Standard Component Story Render Template](@shko.online/StandardComponentStoryRenderTemplate) instructions file. If the component is a virtual `React` component use the `ComponentFrameworkMockGeneratorReact` class to create a render function for the story as shown in the [React Component Story Render Template](@shko.online/ReactComponentStoryRenderTemplate) instructions file.