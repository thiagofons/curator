import { useTranslations } from "@/i18n/utils";
import { formSchema, sendForm, type FormValues } from "@/lib/sendForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui-web/base/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui-web/base/field";
import { Input } from "@repo/ui-web/base/input";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const GetStartedForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      theme: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await sendForm(data);
      toast(t("get_started.form.success_message"));
    } catch {
      toast.error(t("get_started.form.error_message"));
      return;
    }

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
