# Standard Component Story Render Template
If the `PCF` component is a Virtual component you must build a template to place in the `stories\{ComponentName}.render.ts` that uses `ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>` to render the component as follows:

```ts
// necessary imports


export interface StoryArgs extends PCFStoryArgs {
    // story field definition based on component
}

export const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      container.className = "{ComponentName}";
      mockGenerator = new ComponentFrameworkMockGeneratorReact(
        ComponentName,
        {
          /*Parameter to PropertyMock Mapping*/
        },
        {
         /* output only types */
        }
      );

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._SetCanvasItems({
        /* Input or Bound Parameters mapped to story args */
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      // for each parameter of type input or bound we use the typed method to update the value from Storybook like follows `mockGenerator.context._parameters.{Parameter}._SetValue(args.{Parameter});`
      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};


```