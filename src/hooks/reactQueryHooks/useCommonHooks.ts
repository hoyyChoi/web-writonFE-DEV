import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getFinishModal } from "@/apis/FinishModal";
import { organizationChallengeDataType } from "@/types/axios";
import { getMyCommunityStory } from "@/apis/CommunityPage";
import { getChallengingList } from "@/apis/login";
import {
  getNotificationCount,
  getNotificationData,
  patchNotificationCount,
} from "@/apis/notification";

// 피니시 모달 여부
export const useGetFinishModal = ({ organization, challengeId }: organizationChallengeDataType) => {
  return useQuery({
    queryKey: ["getFinishModal", organization, challengeId],
    queryFn: () => getFinishModal({ organization, challengeId }),
    select: (data) => data.review,
  });
};

// 개인 정보 가져오기 (프로필 이미지, 이름, 소개, 직무..)
export const useGetMyInformation = (challengeId: string) => {
  return useQuery({
    queryKey: ["getMyInformation", challengeId],
    queryFn: () => getMyCommunityStory(challengeId),
    select: (data) => data,
  });
};

// 개인 속한 오가니제이션 및 챌린지 리스트 가져오기 (organization, challengeId, challengeName~~)[]
export const useGetOrganizationsAndChallenges = () => {
  return useQuery({
    queryKey: ["getOrganizationsAndChallenges"],
    queryFn: () => getChallengingList(),
    select: (data) => data,
  });
};

// 헤더 알림 및 카운터 숫자 세기
// 리액트 쿼리로 두 개의 API 데이터 호출 및 가공
export const useNotificationDataAndCount = ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  return useQuery({
    queryKey: ["getNotificationDataAndCount", organization, challengeId],
    queryFn: async () => {
      const [notificationData, notificationCount] = await Promise.all([
        getNotificationData(organization, challengeId),
        getNotificationCount(organization, challengeId),
      ]);

      return {
        notificationData,
        notificationNumber: notificationData.length - notificationCount.checkCount,
      };
    },
    select: (data) => ({
      notificationData: data.notificationData,
      notificationNumber: data.notificationNumber,
    }),
  });
};

interface UpdateNotificationParams extends organizationChallengeDataType {
  count: number; // count 추가
}

export const useUpdateNotificationCount = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ organization, challengeId, count }: UpdateNotificationParams) => {
      await patchNotificationCount(organization, challengeId, count);
    },
    onSuccess: (_, { organization, challengeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getNotificationDataAndCount", organization, challengeId],
      });
    },
    onError: (error) => {
      console.error("Error updating notification count:", error);
    },
  });

  return { mutate };
};