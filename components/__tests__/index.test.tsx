import { render } from "@testing-library/react";

it("renders CopyButton unchanged", () => {
  const { container } = render(<button>Button</button>);
  expect(container).toMatchSnapshot();
});
