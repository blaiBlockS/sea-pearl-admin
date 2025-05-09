"use client";

import Button from "@/components/common/button";
import { DatePicker } from "@/components/common/datePicker";
import Input from "@/components/common/input";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  expenseConfigSchema,
  ExpenseConfigType,
} from "@/schemas/expense.schema";
import {
  getExpenseDetail,
  putExpenseUpdate,
} from "@/services/dashboard/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, useForm } from "react-hook-form";

export default function ExpenseDetail() {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<></>}>
        <ExpenseDetailInner />
      </Suspense>
    </ErrorBoundary>
  );
}

const ExpenseDetailInner = () => {
  // const router = useRouter();
  const param = useParams();
  const id = Array.isArray(param.id) ? param.id[0] : param.id;

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_FINANCE_EXPENSE_DETAIL(id),
    queryFn: () => getExpenseDetail(id),
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: putExpenseUpdate,
    onSuccess: () => {
      window.alert("수정 성공");
    },
    onError: () => {
      window.alert("수정 중 에러가 발생하였습니다.");
    },
  });

  const onSubmit = (data: ExpenseConfigType) => {
    const { link, expenseDate } = data;
    mutation.mutate({
      id,
      link: link,
      expenseDate,
    });
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseConfigType>({
    resolver: zodResolver(expenseConfigSchema),
    mode: "onChange",
    defaultValues: {
      expenseDate: data.expenseDate ? new Date(data.expenseDate) : undefined,
      link: data.link,
    },
  });

  // 새로운 래플 생성 버튼
  const EditButton = () => {
    return (
      <Button variant="fill" onClick={handleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-3">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      <Title fontSize="text-head2 w-1/2" ActionButton={EditButton}>
        <span className="mr-5">지출</span>
      </Title>

      <div className="bg-background-secondary mb-8 w-1/2 flex flex-col gap-5 rounded-xl p-8">
        {/* 출금 일자 */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">출금 일자</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">
            {/* DATE_PICKER */}
            <Controller
              name="expenseDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value} //
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* TELEGRAM FIRST NAME */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">
            Telegram First Name
          </span>
          <div className="flex  flex-1 max-w-4/5">{data.firstName}</div>
        </div>

        {/* TELEGRAM LAST NAME */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">
            Telegram Last Name
          </span>
          <div className="flex  flex-1 max-w-4/5 gap-4">
            {data.lastName || "-"}
          </div>
        </div>

        {/* TELEGRAM ID */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">Telegram ID</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">{data.telegramId}</div>
        </div>

        {/* SEAPEARL UID */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">SeaPearl UID</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">{data.userId}</div>
        </div>

        {/* 출금 요청한 USDT */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">출금 요청한 USDT</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">
            {data.order_amount || data.amount}
          </div>
        </div>

        {/* 출금 요청일 */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">출금 요청일</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">{data.orderDate}</div>
        </div>

        {/* 출금 TXID (링크) */}
        <div className="flex items-center justify-between gap-8">
          <span className="text-body2 flex-1 max-w-1/5">출금 TXID (링크)</span>
          <div className="flex  flex-1 max-w-4/5 gap-4">
            <Input
              inputClassName="h-10 input-no-spinner"
              placeholder="Enter quantity"
              hint={errors?.link?.message}
              {...register("link")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
