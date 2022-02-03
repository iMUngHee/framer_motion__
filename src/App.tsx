import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Gird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  border: none;
  background: none;
  background-color: white;
  margin-top: 40px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: blue;
  font-size: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVars = {
  hover: (n: string) => ({
    scale: n === "1" || n === "4" ? 1.1 : 1,
    x: n === "1" || n === "4" ? (n === "4" ? "20px" : "-20px") : 0,
    y: n === "1" || n === "4" ? (n === "4" ? "10px" : "-10px") : 0,
  }),
};

const buttonVars = {
  start: {},
  end: {},
  click: {
    color: "rgb(255, 160, 17)",
    scale: 1.3,
    transition: {
      duration: 0.3,
    },
  },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [move, setMove] = useState("2");
  return (
    <Wrapper>
      <Gird>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={boxVars}
            custom={n}
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            whileHover="hover"
          >
            <AnimatePresence>
              {n === "2" || n === "3" ? (
                move === n ? (
                  <Circle layoutId="circle" />
                ) : null
              ) : null}
            </AnimatePresence>
          </Box>
        ))}
      </Gird>
      <Button
        onTapStart={() => setMove((prev) => (prev === "2" ? "3" : "2"))}
        onTap={() => setMove((prev) => (prev === "2" ? "3" : "2"))}
        variants={buttonVars}
        whileTap="click"
      >
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            initial={{ background: "rgba(0, 0, 0, 0)" }}
            animate={{ background: "rgba(0, 0, 0, 0.5)" }}
            exit={{ background: "rgba(0, 0, 0, 0)" }}
            onClick={() => setId(null)}
          >
            <Box
              style={{ width: 400, height: 200, backgroundColor: "white" }}
              layoutId={id}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
export default App;
