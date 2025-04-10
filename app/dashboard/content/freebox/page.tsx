"use client";

import Button from "@/components/common/button";
import { EdittingTable } from "@/components/common/edittingTable";
import { rouletteColumnHelper } from "@/components/common/edittingTable/columns";
import TableInput from "@/components/common/edittingTable/tableInput";
import { SelectBox } from "@/components/common/selectBox";
import Title from "@/components/layout/title";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  freeBoxConfigSchema,
  FreeBoxConfigType,
  FreeBoxRewardType,
} from "@/schemas/free-box.schema";
import {
  getFreeBoxConfig,
  putFreeBoxConfig,
} from "@/services/dashboard/content/freeBox";
import { getDefaultFreeBoxValues } from "@/utils/getDefaultFreeBoxValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 as TrashIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function FreeBox() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <FreeBoxInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function FreeBoxInner() {
  /**
   *  @프리박스_데이터_패칭
   * */
  const { data: freeBoxData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ROULETTE_CONFIG,
    queryFn: getFreeBoxConfig,
  });

  /**
   *  @프리박스_구성_테이블_데이터로_변환
   * */
  const {
    register: rouletteRegister,
    control: freeBoxControl,
    handleSubmit: rouletteHandleSubmit,
    getValues: rouletteGetValues,
    // formState: { errors },
  } = useForm<FreeBoxConfigType>({
    resolver: zodResolver(freeBoxConfigSchema),
    mode: "onBlur",
    defaultValues: getDefaultFreeBoxValues(freeBoxData),
  });

  // 3. 테이블 데이터 배열 동적 관리
  const { fields, append, remove } = useFieldArray({
    control: freeBoxControl,
    name: "reward",
  });

  const handleAppend = () => {
    append({
      amount: 0,
      reward_type: "shell",
      chance: 0,
    });
  };

  const [totalSum, setTotalSum] = useState<number>(100);

  // 4. HEADER / CELL 메타 정보
  const rouletteColumns = [
    rouletteColumnHelper.display({
      id: "id",
      header: () => <div className="pl-3">번호</div>,
      cell: ({ row }) => {
        return <div className="pl-3">{row.index + 1}</div>;
      },
    }),

    rouletteColumnHelper.accessor("amount", {
      id: "amount",
      header: "리워드 양",
      cell: ({ row }) => {
        return (
          <TableInput
            {...rouletteRegister(`reward.${row.index}.amount`, {
              valueAsNumber: true,
            })}
          />
        );
      },
    }),

    rouletteColumnHelper.accessor("reward_type", {
      id: "reward_type",
      header: "리워드 분류",
      cell: ({ row }) => {
        return (
          <Controller
            name={`reward.${row.index}.reward_type`}
            control={freeBoxControl}
            defaultValue="usdt"
            render={({ field: { onChange, value } }) => (
              <SelectBox
                onValueChange={onChange}
                value={value}
                rewardList={["shell", "pearl"]}
              />
            )}
          />
        );
      },
    }),

    rouletteColumnHelper.accessor("chance", {
      id: "chance",
      header: "당첨 확률(%)",
      cell: ({ row }) => {
        return (
          <TableInput
            {...rouletteRegister(`reward.${row.index}.chance`, {
              valueAsNumber: true,
            })}
            onBlur={() => {
              const reward = rouletteGetValues("reward");

              const reduced = reward.reduce((acc, cur) => {
                return acc + (Number(cur.chance) || 0);
              }, 0);
              setTotalSum(reduced); // 필요한 계산만 여기서
            }}
          />
        );
      },
    }),

    rouletteColumnHelper.display({
      id: "delete",
      header: () => <div className="pr-10 flex justify-end">삭제</div>,
      cell: ({ row }) => {
        return (
          <div className="pr-10 flex justify-end">
            <Button
              variant="unstyled"
              onClick={() => {
                remove(row.index);
              }}
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        );
      },
    }),
  ] as ColumnDef<FreeBoxRewardType, unknown>[];

  /**
   * @프리박스_수정_mutation
   */
  const freeBoxMutation = useMutation({
    mutationFn: putFreeBoxConfig,
    onSuccess: () => {},
    onError: () => {
      window.alert("프리박스 수정 중 에러가 발생하였습니다.");
    },
  });

  // 최종 제출 핸들러
  const onSubmit = async (data: FreeBoxConfigType) => {
    try {
      if (totalSum !== 100) {
        window.alert(
          "프리박스 설정을 변경하려면 총 당첨 확률이 100%여야 합니다. 확률을 확인해주세요."
        );
        return;
      }
      const { reward } = data;

      /**
       * @여기서_데이터_수정_FETCH !!!!!!
       */
      await freeBoxMutation.mutateAsync({
        id: freeBoxData.id, // 그대로 던지기
        reward, // 수정된 부분
      });

      window.alert("Free Box를 성공적으로 수정하였습니다.");
    } catch (err) {
      // ❌ 하나라도 실패하면 여기서 에러 처리
    }
  };

  // 수정 완료 버튼
  const EditCompleteButton = () => {
    return (
      <Button variant="fill" onClick={rouletteHandleSubmit(onSubmit)}>
        <div className="flex h-10 items-center gap-2 px-6">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7 w-3/5 min-w-[500px]">
      {/* 타이틀 */}
      <Title ActionButton={EditCompleteButton}>Free Box 리워드 수정</Title>

      {/* 설정 등록 */}
      <form className="flex flex-col flex-1">
        {/* 프리박스 구성 설정 테이블 */}
        <EdittingTable //
          columns={rouletteColumns}
          data={fields}
          onAppend={handleAppend}
          reducedKey={"총 당첨확률: "}
          reducedValue={totalSum}
        />
      </form>
    </div>
  );
}
