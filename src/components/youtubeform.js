import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
let redercount = 0;

function YoutubeForm() {
  const form = useForm({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/3");
      const data = await res.json();
      return {
        name: data?.name,
        email: data?.email,
        channel: "",
        socialmedia: {
          facebook: "",
          twitter: "",
        },
        phone: ["", ""],
        phoneNumbers: [{ number: "" }],
        location: [
          {
            address: {
              village: "",
              mandal: "",
              dist: "",
              state: "",
            },
          },
        ],
        age: 0,
        dob: new Date(),
      };
    },
    mode: "all", //onSubmit(default),onChange,onBlue,onTouched
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const {
    fields: phones,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  const { fields, append, remove } = useFieldArray({
    name: "location",
    control,
  });

  redercount++;

  const showErrormsg = (errors, name) => {
    if (!errors[name]) {
      return null;
    }
    return <p className="text-red-400">{errors[name].message}</p>;
  };

  const onError = (errors) => {
    console.log(errors);
  };
  const onSubmit = (data) => {
    console.log("heloo form Data", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  // console.log(isValid, "valid");
  console.log(
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    "submitting"
  );

  // console.log(touchedFields, dirtyFields, isDirty, "touch and dirty");

  //it not working on dependency....
  // useEffect(() => {
  //   const sub = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => sub.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [watch("age")]);

  // console.log(watch());

  return (
    <div>
      <div className="text-center mt-10">Youtube Form {redercount}</div>
      <h1 className="text-center mt-2">watch: {watch("name")}</h1>
      <div className="mt-6">
        <form
          className="flex justify-center "
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="bg-slate-100 w-60"
                id="username"
                {...register("name", {
                  required: {
                    value: true,
                    message: "please provide the username",
                  },
                })}
              ></input>
              {showErrormsg(errors, "name")}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="bg-slate-100 w-60"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "please provide the email",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "invalid email address",
                  },
                  validate: {
                    notallowed: (fieldValue) => {
                      return (
                        fieldValue !== "admin@naik.com" ||
                        "enter a different email"
                      );
                    },
                    notvaliddomin: (fieldValue) => {
                      return (
                        !fieldValue?.endsWith("baddomine.com") ||
                        "this domine is found"
                      );
                    },
                    emailExisted: async (fieldValue) => {
                      const res = await fetch(
                        `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                      );
                      const data = await res.json();
                      if (data.length) {
                        return "email alread existed";
                      }
                      // return data.length === 0 || "Email already exist";
                    },
                  },
                })}
              ></input>
              {showErrormsg(errors, "email")}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="channel">channel</label>

              <input
                type="text"
                className="bg-slate-100 w-60"
                id="channel"
                {...register("channel")}
              ></input>
              {showErrormsg(errors, "channel")}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="age">Age</label>

              <input
                type="number"
                className="bg-slate-100 w-60"
                id="age"
                {...register("age", {
                  valueAsNumber: true,
                  disabled: watch("name") === "",
                })}
              ></input>
              {showErrormsg(errors, "age")}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="dob">Date Of Birth</label>

              <input
                type="date"
                className="bg-slate-100 w-60"
                id="dob"
                {...register("dob", {
                  valueAsDate: true,
                })}
              ></input>
              {showErrormsg(errors, "dob")}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                className="bg-slate-100 w-60"
                id="facebook"
                {...register("socialmedia.facebook", {
                  required: {
                    value: true,
                    message: "please enter fb id",
                  },
                })}
              ></input>
              <p className="text-red-400">
                {errors.socialmedia?.facebook?.message}
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                className="bg-slate-100 w-60"
                id="twitter"
                {...register("socialmedia.twitter", {
                  required: {
                    value: true,
                    message: "please enter twitter user id",
                  },
                })}
              ></input>
              <p className="text-red-400">
                {errors.socialmedia?.twitter?.message}
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone1">phone 1</label>
              <input
                type="text"
                className="bg-slate-100 w-60"
                id="phone1"
                {...register("phone[0]", {
                  required: {
                    value: true,
                    message: "please enter phone number 1",
                  },
                })}
              ></input>
              <p className="text-red-400">{errors.phone?.message}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone2">phone 2</label>
              <input
                type="number"
                className="bg-slate-100 w-60"
                id="phone2"
                {...register("phone[1]", {
                  required: {
                    value: true,
                    message: "please enter phone number 2",
                  },
                })}
              ></input>
              <p className="text-red-400">{errors.phone?.message}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              {phones.map((field, index) => {
                return (
                  <div className="" key={field.id}>
                    <input
                      type="text"
                      className="bg-gray-200"
                      // {...register(`phoneNumbers.${index}.number`)}
                      {...register(`phoneNumbers[${index}].number`)}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => phoneRemove(index)}>
                        remove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-1">
              <button
                className=""
                type="button"
                onClick={() => phoneAppend({ number: "" })}
              >
                add new phone number
              </button>
            </div>

            <h1 className="mt-10"> ADDRESS</h1>

            <div className="flex flex-col gap-y-2">
              {fields.map((field, index) => {
                return (
                  <div
                    className="border-2 border-solid border-red-500 flex flex-col gap-y-1"
                    key={field.id}
                  >
                    <div className="flex flex-col gap-y-4">
                      <div className="">
                        <label htmlFor={`location[${index}].address.village`}>
                          village
                        </label>
                        <input
                          type="text"
                          id={`location[${index}].address.village`}
                          className="bg-gray-200"
                          {...register(`location[${index}].address.village`)}
                        />
                      </div>

                      <div className="">
                        <label htmlFor={`location[${index}].address.mandal`}>
                          mandal
                        </label>
                        <input
                          type="text"
                          id={`location[${index}].address.mandal`}
                          className="bg-gray-200"
                          {...register(`location[${index}].address.mandal`)}
                        />
                      </div>

                      <div className="">
                        <label htmlFor={`location[${index}].address.dist`}>
                          dist
                        </label>
                        <input
                          type="text"
                          id={`location[${index}].address.dist`}
                          className="bg-gray-200"
                          {...register(`location[${index}].address.dist`)}
                        />
                      </div>

                      <div className="">
                        <label htmlFor={`location[${index}].address.state`}>
                          state
                        </label>
                        <input
                          type="text"
                          id={`location[${index}].address.state`}
                          className="bg-gray-200"
                          {...register(`location[${index}].address.state`)}
                        />
                      </div>
                    </div>
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        remove address
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <button
                className=""
                type="button"
                onClick={() =>
                  append({
                    address: {
                      village: "",
                      mandal: "",
                      dist: "",
                      state: "",
                    },
                  })
                }
              >
                add address
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="ml-4"
                // disabled={!isDirty || !isValid}
              >
                submit
              </button>
              <button type="button" className="ml-4" onClick={() => reset()}>
                reset
              </button>
              <button type="button" className="ml-4" onClick={() => trigger()}>
                trigger/validate
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log(getValues(["name", "age"]));
                }}
                className="ml-4"
              >
                Get values
              </button>

              <button
                type="button"
                onClick={() => {
                  setValue("name", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                className="ml-4"
              >
                Set value
              </button>
            </div>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default YoutubeForm;
