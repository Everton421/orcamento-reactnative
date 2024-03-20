import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Button } from "native-base";
export default function Teste() {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
    </NativeBaseProvider>
  );
}
