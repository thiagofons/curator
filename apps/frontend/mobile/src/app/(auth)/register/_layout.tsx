import { RegisterForm } from "@/features/auth/@types";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

export default function RegisterLayout() {
  const methods = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Stack />
    </FormProvider>
  );
}
