import Image from "@base/Image";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const BackgroundImageWrapper = styled.div`
  width: 178px;
  height: 116px;
  position: relative;
  top: -97px;
  z-index: 1;
  ${mediaQuery.uptoMobile} {
    width: 100%;
  }
`;

const UserImageWrapper = styled.div`
  width: ${Spacings.SPACING_12B};
  height: ${Spacings.SPACING_12B};
  position: relative;
  & > span {
    border-radius: 1000px;
  }
`;

const AnimationContainer = styled(LottieAnimation)`
  width: 178px;
  height: 116px;
  position: relative;
  top: -120px;
  flex-shrink: 0;
  ${mediaQuery.uptoMobile} {
    width: 140px;
  }
`;

const UserName = styled(Typography)`
  max-width: 146px;
  height: ${Spacings.SPACING_6B};
  letter-spacing: -0.005em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--color-text-primary);
  ${mediaQuery.uptoMobile} {
    max-width: 110px;
  }
`;

const UserReferral = styled(Typography)`
  width: 86px;
  height: ${Spacings.SPACING_3B};
  font-style: normal;
  font-weight: ${Fonts.HEAVY};
  line-height: ${Fonts.BUTTON_LINE_HEIGHT};
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-i-blue);
`;

const CardWrapper = styled.div`
  width: 178px;
  height: 116px;
  margin-top: ${Spacings.SPACING_12B};
  ${mediaQuery.uptoMobile} {
    width: 140px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: ${Spacings.SPACING_1B};
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;
`;
const WinnerCard = ({ data, currentUser = false }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  useEffect(() => {
    const userCard = document.getElementsByClassName("current-user-card");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setTimeout(() => {
            setShowAnimation(false);
          }, 8000);
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 1,
      }
    );
    if (userCard.length) observer.observe(userCard[0]);
  }, []);
  const isMobile = useIsMobile();
  if (!Object.keys(data).length) return null;
  const { referralCount = "", user: { avatar = "", firstName = "" } = {} } =
    data;

  return (
    <CardWrapper className={currentUser ? "current-user-card" : ""}>
      <InfoWrapper>
        <UserImageWrapper>
          <Image src={avatar} layout="fill" alt="user" />
        </UserImageWrapper>
        <UserName variant="h5">{firstName}</UserName>
        <UserReferral variant="p3">{referralCount} referrals</UserReferral>
      </InfoWrapper>
      <BackgroundImageWrapper>
        {isMobile ? (
          <MwebWinnerCardBgIcon width={140} height={116} />
        ) : (
          <WinnerCardBgIcon width={178} height={116} />
        )}
        {currentUser && (
          <>
            {showAnimation && (
              <AnimationContainer
                src={getAnimationPath("referrals/userWonLaptop.json")}
              />
            )}

            <Image
              src={
                isMobile
                  ? "referrals/mwebUserBorder.svg"
                  : "referrals/userBorder.svg"
              }
              layout="fill"
              alt="offer"
              objectFit="fill"
            />
          </>
        )}
      </BackgroundImageWrapper>
    </CardWrapper>
  );
};

export default WinnerCard;
