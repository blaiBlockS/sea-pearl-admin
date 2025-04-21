"use client";

import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import { EdittingTable } from "@/components/common/edittingTable";
import { rouletteColumnHelper } from "@/components/common/edittingTable/columns";
import TableInput from "@/components/common/edittingTable/tableInput";
import { SelectBox } from "@/components/common/selectBox";
import Title from "@/components/layout/title";
import LiveBarConfigTable from "@/components/pages/dashboard/roulette";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  liveBarConfigSchema,
  LiveBarConfigType,
} from "@/schemas/live-bar.schema";
import {
  CreateRouletteRewardFormData,
  rouletteFormSchema,
} from "@/schemas/roulette.schema";
import {
  getLiveBarConfig,
  getRouletteConfig,
  putUpdateLiveBarConfig,
  putUpdateRouletteConfig,
} from "@/services/dashboard/content/roulette";
import { RouletteRewardType } from "@/types/roulette";
import { getDefaultLiveBarValues } from "@/utils/getDefaultLiveBarValues";
import { parseDefaultRouletteValues } from "@/utils/getDefaultRouletteValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { LucideTrash2 as TrashIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function Roulette() {
  return (
    <ErrorBoundary
      fallbackRender={(error) => <div>에러: {JSON.stringify(error.error)}</div>}
    >
      <Suspense fallback={<></>}>
        <RouletteInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function RouletteInner() {
  /**
   *  @룰렛_데이터_패칭
   * */
  const { data: rouletteData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ROULETTE_CONFIG,
    queryFn: getRouletteConfig,
  });
  console.log(rouletteData, "rouletteData...");
  /**
   *  @라이브바_데이터_패칭
   * */
  const { data: liveBarData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_LIVE_BAR_CONFIG,
    queryFn: getLiveBarConfig,
  });
  console.log(liveBarData, "liveBarData");

  /**
   *  @룰렛_구성_테이블_데이터로_변환
   * */
  const {
    register: rouletteRegister,
    control: rouletteControl,
    handleSubmit: rouletteHandleSubmit,
    getValues: rouletteGetValues,
    // formState: { errors },
  } = useForm<CreateRouletteRewardFormData>({
    resolver: zodResolver(rouletteFormSchema),
    mode: "onBlur",
    defaultValues: parseDefaultRouletteValues(rouletteData),
  });
  /**
   *  @라이브바_설정_변환
   * */
  const {
    register: liveBarRegister,
    handleSubmit: liveBarHandleSubmit,
    formState: { errors },
  } = useForm<LiveBarConfigType>({
    resolver: zodResolver(liveBarConfigSchema),
    mode: "onChange",
    defaultValues: getDefaultLiveBarValues(liveBarData),
  });

  // 3. 테이블 데이터 배열 동적 관리
  const { fields, append, remove } = useFieldArray({
    control: rouletteControl,
    name: "reward",
  });

  const handleAppend = () => {
    append({
      live_bar: false,
      amount: 0,
      reward_type: "usdt",
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

    rouletteColumnHelper.accessor("live_bar", {
      id: "live_bar",
      header: () => <div>라이브바</div>,
      cell: ({ row }) => (
        <CheckBox {...rouletteRegister(`reward.${row.index}.live_bar`)} />
      ),
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
            control={rouletteControl}
            defaultValue="usdt"
            render={({ field: { onChange, value } }) => (
              <SelectBox
                onValueChange={onChange}
                value={value}
                valueList={["shell", "usdt"]}
              />
            )}
          />
        );
      },
    }),

    rouletteColumnHelper.accessor("chance", {
      id: "chance",
      header: "당첨 확률",
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
      header: "삭제",
      cell: ({ row }) => {
        return (
          <Button
            variant="unstyled"
            onClick={() => {
              remove(row.index);
            }}
          >
            <TrashIcon size={16} />
          </Button>
        );
      },
    }),
  ] as ColumnDef<RouletteRewardType, unknown>[];

  /**
   * @룰렛_수정_mutation
   */
  const rouletteMutation = useMutation({
    mutationFn: putUpdateRouletteConfig,
    onSuccess: () => {},
    onError: () => {
      window.alert("룰렛 수정 중 에러가 발생하였습니다.");
    },
  });
  /**
   * @라이브바_수정_mutation
   */
  const liveBarMutation = useMutation({
    mutationFn: putUpdateLiveBarConfig,
    onSuccess: () => {},
    onError: () => {
      window.alert("라이브바 수정 중 에러가 발생하였습니다.");
    },
  });

  /**
   * @룰렛_라이브바_Validation_로직
   */
  // onSubmit RouletteConfig
  const onValidateRouletteConfig = () =>
    new Promise<CreateRouletteRewardFormData>((resolve, reject) => {
      rouletteHandleSubmit(resolve, reject)();
    });
  // onSubmit RouletteConfig
  const onValidateLiveBarConfig = () =>
    new Promise<LiveBarConfigType>((resolve, reject) => {
      liveBarHandleSubmit(resolve, reject)();
    });

  // 최종 제출 핸들러
  const onSubmitAll = async () => {
    try {
      if (totalSum !== 100) {
        window.alert(
          "룰렛 설정을 변경하려면 총 당첨 확률이 100%여야 합니다. 확률을 확인해주세요."
        );
        return;
      }

      const [rouletteUpdatedData, liveBarUpdatedData] = await Promise.all([
        onValidateRouletteConfig(),
        onValidateLiveBarConfig(),
      ]);

      /**
       * @여기서_데이터_수정_FETCH !!!!!!
       */
      const { reward } = rouletteUpdatedData;

      await rouletteMutation.mutateAsync({
        entry: rouletteData.entry, // 그대로 던지기
        id: rouletteData.id, // 그대로 던지기
        reward, // 수정된 부분
      });

      window.alert("룰렛 설정이 변경되었습니다.");

      await liveBarMutation.mutateAsync(liveBarUpdatedData);

      window.alert("라이브바 설정이 변경되었습니다.");
    } catch (err) {
      // ❌ 하나라도 실패하면 여기서 에러 처리
    }
  };

  // 수정 완료 버튼
  const EditCompleteButton = () => {
    return (
      <Button variant="fill" onClick={onSubmitAll}>
        <div className="flex h-10 items-center gap-2 px-6">
          <span className="text-body3-medium">수정</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="px-9 py-7">
      <Title ActionButton={EditCompleteButton}>Roulette / Live Bar</Title>

      {/* 설정 등록 */}
      <form className="flex flex-1 gap-5">
        <div className="flex-3/5">
          {/* 타이틀 */}
          <Title fontSize="text-head2">Roulette Reward 수정</Title>

          {/* 룰렛 구성 설정 테이블 */}
          <EdittingTable //
            columns={rouletteColumns}
            data={fields}
            onAppend={handleAppend}
            reducedKey={"총 당첨확률: "}
            reducedValue={totalSum}
          />
        </div>

        <div className="flex-2/5">
          {/* 타이틀 */}
          <Title fontSize="text-head2">Live Bar 설정</Title>

          {/* 라이브바 설정 테이블 */}
          <LiveBarConfigTable register={liveBarRegister} errors={errors} />
        </div>
      </form>
    </div>
  );
}
