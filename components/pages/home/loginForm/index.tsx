"use client";

import Button from "../../../common/button";
import Input from "../../../common/input";
import { loginSchema, LoginSchema } from "../../../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const navigation = useRouter();

  const onSubmit = (data: LoginSchema) => {
    console.log("성공!", data);
    navigation.push("/dashboard/main");
  };

  const email = useWatch({ control, name: "email" });
  const password = useWatch({ control, name: "password" });
  const isEmailEmpty = !email;
  const isPasswordEmpty = !password;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-secondary border-stroke-primary flex min-h-[344px] w-[384px] flex-col items-center justify-center rounded-xl border p-9"
    >
      {/* HEADER */}
      <div className="mb-9 flex items-center gap-3">
        <Image
          src={"/images/sea-pearl-logo.png"}
          alt="logo"
          width={36}
          height={36}
        />
        <span className="text-body1-bold">Sea Pearl</span>
      </div>

      {/* ID */}
      <Input
        type="email"
        {...register("email", { required: true })}
        placeholder="Email"
        totalClassName="w-full mb-3"
        iconSrc={"/icons/user-gray.svg"}
        hint={errors.email?.message}
        isEmpty={isEmailEmpty}
      />

      {/* PASSWORD */}
      <Input
        type="password"
        {...register("password", { required: true })}
        placeholder="Password"
        totalClassName="w-full mb-9"
        iconSrc={"/icons/lock.svg"}
        hint={errors.password?.message}
        isEmpty={isPasswordEmpty}
        autoComplete="current-password"
      />

      {/* BUTTON */}
      <Button variant="fill" type="submit" className="h-13 w-full">
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
