"use client";

import { DataTable } from "@/components/common/table";
import Title from "@/components/layout/title";
import ColumnBox from "@/components/pages/dashboard/user/columnBox";
import Divider from "@/components/pages/dashboard/user/divider";
import Subtitle from "@/components/pages/dashboard/user/subtitle";
import QuestDoneTable from "@/components/pages/dashboard/user/tables/questDone";
import RewardTable from "@/components/pages/dashboard/user/tables/rewards";
import UsdtExpenseTable from "@/components/pages/dashboard/user/tables/usdtExpense";
import { QUERY_KEY } from "@/constants/queryKey";
import { getUserDetail } from "@/services/dashboard/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function UserDetail() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>...</div>}>
        <UserDetailInner />
      </Suspense>
    </ErrorBoundary>
  );
}

function UserDetailInner() {
  const { id } = useParams();
  const processedId = Array.isArray(id) ? id[0] : id;

  const { data: userDetailData } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_USER_DETAIL(processedId),
    queryFn: () => getUserDetail(processedId),
    refetchOnWindowFocus: true,
  });

  return (
    <div className="flex gap-8 px-9 py-7">
      <div className="flex-1/3">
        {/* 타이틀 */}
        <Title fontSize="text-head2 flex gap-4">
          <span>
            {userDetailData.firstName} {userDetailData.lastName}
          </span>{" "}
          <span className="text-text-teritary">@{userDetailData.handle}</span>
        </Title>

        {/* 유저 설정 */}
        <div className="bg-background-secondary mb-8 flex-1 flex flex-col gap-5 rounded-xl p-8">
          {/* TELEGRAM FIRST NAME */}
          <ColumnBox
            columnName="Telegram First Name:"
            columnValue={userDetailData.firstName}
          />

          {/* TELEGRAM LAST NAME */}
          <ColumnBox
            columnName="Telegram Last Name:"
            columnValue={userDetailData.lastName}
          />

          {/* TELEGRAM HANDLE */}
          <ColumnBox
            columnName="Telegram Handle:"
            columnValue={userDetailData.handle}
          />

          {/* TELEGRAM ID */}
          <ColumnBox
            columnName="Telegram ID:"
            columnValue={userDetailData.telegramUid}
          />

          {/* SEAPEARL UID */}
          <ColumnBox
            columnName="SeaPearl UID:"
            columnValue={userDetailData.id}
          />

          {/* 가입 일시 */}
          <ColumnBox
            columnName="가입 일시:"
            columnValue={format(userDetailData.signUpData, "yy-MM-dd HH:mm:ss")}
          />

          {/* 마지막 접속일 */}
          <ColumnBox
            columnName="마지막 접속일:"
            columnValue={format(
              userDetailData.lastConnection,
              "yy-MM-dd HH:mm:ss"
            )}
          />

          {/* DIVIDER */}
          <Divider />

          {/* SUBTITLE: 초대자 (유입 경로) */}
          <Subtitle value="초대자 (유입 경로)" />

          <ColumnBox
            columnName="Telegram First Name:"
            columnValue={userDetailData.inviter.firstName}
          />

          {/* TELEGRAM LAST NAME */}
          <ColumnBox
            columnName="Telegram Last Name:"
            columnValue={userDetailData.inviter.lastName}
          />

          {/* TELEGRAM HANDLE */}
          <ColumnBox
            columnName="Telegram Handle:"
            columnValue={userDetailData.inviter.lastName}
          />

          {/* TELEGRAM ID */}
          <ColumnBox
            columnName="Telegram ID:"
            columnValue={userDetailData.inviter.handle}
          />

          {/* SEAPEARL UID */}
          <ColumnBox
            columnName="SeaPearl UID:"
            columnValue={userDetailData.inviter.id}
          />

          {/* DIVIDER */}
          <Divider />

          {/* 레퍼럴 링크 */}
          <ColumnBox
            columnName="레퍼럴 링크:"
            columnValue={userDetailData.handle}
          />

          {/* 초대한 유저 수 */}
          <ColumnBox
            columnName="초대한 유저 수:"
            columnValue={userDetailData.totalFriends}
          />

          {/* DIVIDER */}
          <Divider />

          {/* 시청한 광고 수 */}
          <ColumnBox
            columnName="시청한 광고 수:"
            columnValue={userDetailData.totalAds}
          />

          {/* DIVIDER */}
          <Divider />

          {/* SUBTITLE: SHELL */}
          <Subtitle value="Shell" />

          {/* 보유한 Shell */}
          <ColumnBox
            columnName="보유한 Shell:"
            columnValue={userDetailData.shells.have}
          />

          {/* 얻은 Shell */}
          <ColumnBox
            columnName="얻은 Shell:"
            columnValue={userDetailData.shells.total_earn}
          />

          {/* 소모한 Shell */}
          <ColumnBox
            columnName="소모한 Shell:"
            columnValue={userDetailData.shells.spent}
          />

          {/* DIVIDER */}
          <Divider />

          {/* SUBTITLE: PEARL */}
          <Subtitle value="Pearl" />

          {/* 보유한 Pearl */}
          <ColumnBox
            columnName="보유한 Pearl:"
            columnValue={userDetailData.pearls.have.toFixed(4)}
          />

          {/* 얻은 Pearl */}
          <ColumnBox
            columnName="얻은 Pearl:"
            columnValue={userDetailData.pearls.total_earn.toFixed(4)}
          />

          {/* 소모한 Pearl */}
          <ColumnBox
            columnName="소모한 Pearl:"
            columnValue={userDetailData.pearls.spent.toFixed(4)}
          />

          {/* Pearl 저장량 업그레이드 횟수 */}
          <ColumnBox
            columnName="Pearl 저장량 업그레이드 횟수:"
            columnValue={userDetailData.pearls.storage}
          />

          {/* Pearl 채굴량 업그레이드 횟수 */}
          <ColumnBox
            columnName="Pearl 채굴량 업그레이드 횟수:"
            columnValue={userDetailData.pearls.fassive}
          />

          {/* DIVIDER */}
          <Divider />

          {/* SUBTITLE: PEARL */}
          <Subtitle value="USDT" />

          {/* 보유한 USDT */}
          <ColumnBox
            columnName="보유한 USDT:"
            columnValue={userDetailData.usdt.have}
          />

          {/* 얻은 USDT */}
          <ColumnBox
            columnName="얻은 USDT:"
            columnValue={userDetailData.usdt.total_earn}
          />

          {/* 출금한 USDT */}
          <ColumnBox
            columnName="출금한 USDT:"
            columnValue={userDetailData.usdt.draw}
          />

          {/* 연결된 TON 지갑 주소 */}
          <ColumnBox
            columnName="연결된 TON 지갑 주소:"
            columnValue={userDetailData.usdt.wallet_address}
          />

          {/* DIVIDER */}
          <Divider />

          {/* SUBTITLE: PEARL */}
          <Subtitle value="컨텐츠 참여 횟수" />

          {/* Free Box */}
          <ColumnBox
            columnName="Free Box:"
            columnValue={userDetailData.freebox}
          />

          {/* Roulette */}
          <ColumnBox
            columnName="Roulette:"
            columnValue={userDetailData.roulette}
          />

          {/* Shell Draw */}
          <ColumnBox
            columnName="Shell Draw:"
            columnValue={userDetailData.shellRaffle}
          />

          {/* Pearl Draw */}
          <ColumnBox
            columnName="Pearl Draw:"
            columnValue={userDetailData.pearlRaffle}
          />
        </div>
      </div>
      <div className="flex-2/3">
        {/* USDT 출금 기록 */}
        <div>
          <Title fontSize="text-head2">USDT 출금 기록</Title>
          <UsdtExpenseTable />
        </div>

        {/* 리워드 지급 기록 */}
        <div>
          <Title fontSize="text-head2">리워드 지급 기록</Title>
          <RewardTable />
        </div>

        {/* 퀘스트 완료 내역 */}
        <div>
          <Title fontSize="text-head2">퀘스트 완료 내역</Title>
          <QuestDoneTable />
        </div>
      </div>
    </div>
  );
}
