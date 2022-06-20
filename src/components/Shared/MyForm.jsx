import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const MyForm = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">{children}</Form>
    </Formik>
  );
};

export const FormHeading = ({ title, slogan }) => (
  <div className="flex flex-col gap-2">
    <p className="text-3xl text-primary font-bold">{title}</p>
    <p className="text-sm text-secondary">{slogan}</p>
  </div>
);

export const FormControll = ({
  iconLeft,
  iconRight,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Field name={name}>
        {(props) => (
          <>
            <label htmlFor={props.field.name} className="capitalize">
              {props.field.name}
            </label>
            <div className="flex items-center input input-bordered focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2">
              {iconLeft && iconLeft}
              <input
                type={type}
                name={props.field.name}
                id={props.field.name}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck="false"
                value={props.field.value}
                onChange={props.field.onChange}
                onBlur={props.field.onBlur}
                className="h-full flex-1 outline-none bg-transparent"
              />
              {iconRight && iconRight}
            </div>
            {props.meta.touched && props.meta.error && (
              <p className="text-error text-sm">{props.meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const FormTextarea = ({
  iconLeft,
  iconRight,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Field name={name}>
        {(props) => (
          <>
            <label htmlFor={props.field.name} className="capitalize">
              {props.field.name}
            </label>

            <textarea
              rows={5}
              type={type}
              name={props.field.name}
              id={props.field.name}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck="false"
              value={props.field.value}
              onChange={props.field.onChange}
              onBlur={props.field.onBlur}
              className="border border-gray-300 rounded-md bg-transparent p-4 focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2"
            />

            {props.meta.touched && props.meta.error && (
              <p className="text-error text-sm">{props.meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const FormSelect = ({ name, options }) => {
  return (
    <div className="flex flex-col gap-2">
      <Field name={name}>
        {(props) => (
          <>
            <label htmlFor={props.field.name} className="capitalize">
              {props.field.name}
            </label>
            <Field
              as="select"
              name={name}
              className="input input-bordered w-full"
            >
              {options.map((option) => (
                <option key={option} value={option} className="capitalize">
                  {option}
                </option>
              ))}
            </Field>
            {props.meta.touched && props.meta.error && (
              <p className="text-error text-sm">{props.meta.error}</p>
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export const FormButton = ({ title }) => (
  <div>
    <Field name="">
      {(props) => {
        return (
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={props.form.isSubmitting}
          >
            {title}
          </button>
        );
      }}
    </Field>
  </div>
);

export const FormLink = ({ text, link, name }) => (
  <div>
    <p className="text-secondary text-sm">
      {text}{" "}
      <Link to={link} className="font-semibold text-primary">
        {name}
      </Link>
    </p>
  </div>
);

export default MyForm;
