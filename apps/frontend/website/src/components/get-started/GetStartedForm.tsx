import { useTranslations } from "@/i18n/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui-web/base/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui-web/base/field";
import { Input } from "@repo/ui-web/base/input";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  theme: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const GetStartedForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      theme: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitting form...");

    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    form.reset();
  };

  const t = useTranslations();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="m-auto max-w-100 space-y-6 text-left"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t("get_started.form.name.label")}*</FieldLabel>
              <Input
                {...field}
                id="form-name"
                aria-invalid={fieldState.invalid}
                placeholder={t("get_started.form.name.placeholder")}
              />
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t("get_started.form.email.label")}*</FieldLabel>
              <Input
                {...field}
                id="form-email"
                aria-invalid={fieldState.invalid}
                placeholder={t("get_started.form.email.placeholder")}
              />
            </Field>
          )}
        />

        <Controller
          name="theme"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t("get_started.form.theme.label")}</FieldLabel>
              <Input
                {...field}
                id="form-theme"
                aria-invalid={fieldState.invalid}
                placeholder={t("get_started.form.theme.placeholder")}
              />
            </Field>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">{t("get_started.form.submit")}</Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default GetStartedForm;
