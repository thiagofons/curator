import { useTranslations } from "@/i18n/utils";
import { formSchema, type FormValues } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui-web/base/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui-web/base/field";
import { Input } from "@repo/ui-web/base/input";
import { actions } from "astro:actions";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const GetStartedForm = () => {
  const t = useTranslations();

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
      const { error } = await actions.createLead(data);

      if (error) {
        throw error;
      }

      toast(t("get_started.form.success_message"), {
        position: "bottom-center",
        duration: 8000,
        style: {
          textAlign: "center",
          fontFamily: "Lexend, sans-serif",
          borderRadius: 16,
          backgroundColor: "#0060F7",
          border: "4px solid #003c9c",
          color: "#FFFFFF",
        },
      });

      form.reset();
    } catch {
      toast.error(t("get_started.form.error_message"), {
        position: "bottom-center",
        duration: 8000,
        style: {
          textAlign: "center",
          fontFamily: "Lexend, sans-serif",
          borderRadius: 16,
          backgroundColor: "#FF383C",
          border: "4px solid #a02628",
          color: "#FFFFFF",
        },
      });
    }
  };

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
