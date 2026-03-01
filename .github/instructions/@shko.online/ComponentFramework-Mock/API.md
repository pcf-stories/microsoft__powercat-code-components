# ComponentFramework-Mock
## API Reference
### Classes

#### `ComponentFrameworkMockGenerator<IInputs, IOutputs>`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `db` | `MetadataDB` | - |
| `context` | `ContextMock<IInputs>` | - |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | MUST be called exactly once to Initialize the component under test. Might do component render on the `HTMLElement` supplied in the constructor |
| `ExecuteUpdateView()` | `void` | Can be called more than once to Update the component render on the `HTMLElement` supplied in the constructor |


---

<a name="componentframeworkmockgeneratorreact"></a>
#### `ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `db` | `MetadataDB` | Offers access to the in-memory database that mimics a dataverse environment |
| `context` | `ContextMock<IInputs>` | Fake implementation of `ComponentFramework.Context` specific to the component under test |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | MUST be called exactly once to Initialize the component under test |
| `ExecuteUpdateView()` | `ReactElement` | Can be called more than once to Update the component render returned as a `ReactElement` |


---

<a name="componentframeworkmockorchestrator"></a>
#### `ComponentFrameworkMockOrchestrator`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `controls` | `OrchestratorInput<T>` | - |
| `db` | `MetadataDB` | - |
| `mockGenerators` | `OrchestratorGenerators<T>` | - |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | - |
| `ExecuteUpdateView()` | `void` | - |


---
