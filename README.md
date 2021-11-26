# StickySideBar

A **React** sticky component that can stick to top when scrolling up and can stick to bottom when scrolling down.

## Demo



https://user-images.githubusercontent.com/55064969/143556256-2f143e35-1895-4cd1-9e80-af040c7e1c12.mov



## Setup

`npm install sticky-n-scroll`  

or  

`yarn add sticky-n-scroll`  

## Use in React

```
import StickySideBar from "sticky-n-scroll"

...

class Demo extends React.Components {
  render() 
  {
    return (
      <StickySideBar topSpace={20} bottomSpace{20}>
        <div> 
          Your content 
        </div>
      </StickySideBar>
    )
  }

}
export default Demo;
```  

## Props of StickySideBar

| Props                | Type        | Description                                                                                                                 |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| topSpace             | number      | **(in pixels)** Determine how much space between the content's **top** and screen's **top** when scrolling **up**.          |
| bottomSpace          | number      | **(in pixels)** Determine how much space between the content's **bottom** and screen's **bottom** when scrolling **down**.  |
| turnOff (optional)   | boolean     | Turn off sticky mode -> Become a normal div                                                                                 |
| maxHeight (optional) | number      | Set max height of sticky div                                                                                                |

