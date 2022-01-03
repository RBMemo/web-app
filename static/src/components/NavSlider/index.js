import { useState } from "react";
import { Button, Flex } from "theme-ui";
import './NavSlider.css'

function NavSlider({ buttons, onIndexChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function onNavClick(index) {
    setSelectedIndex(index);
    onIndexChange(index);
  }
  
  return (
    <Flex className="NavSliderContainer" sx={{ width: ['100%', '70%', '50%'] }}>
      {buttons.map((btnText, i) => (
        <Button variant="noHover"
        key={i}
        sx={{ p: 2, flex: [undefined, 1], bg: selectedIndex === i ? 'primary' : 'transparent', borderRadius: '15px' }}
        onClick={() => onNavClick(i)}>
          {btnText}
        </Button>
      ))}
    </Flex>
  );
}

export default NavSlider;
