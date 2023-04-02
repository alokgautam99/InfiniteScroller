import styled from "@emotion/styled";
import Image from "@base/Image";
import { useEffect, useRef, useState } from "react";

const ShowCaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${mediaQuery.uptoMobile} {
    gap: ${Spacings.SPACING_2B};
  }
`;

const BackgroundWrapper = styled.div`
  width: 608px;
  height: 238px;
  position: relative;
  ${mediaQuery.uptoMobile} {
    top: 0px;
    margin-left: -147px;
    & > span {
      width: 608px;
    }
  }
`;

const MwebBackgroundImageCover = styled.div`
  position: relative;
  top: -192px;
  ${mediaQuery.uptoMobile} {
    width: 100%;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  height: 237px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${Spacings.SPACING_4B};
  padding-right: ${Spacings.SPACING_4B};
`;

const InfoWrapper = styled.div`
  flex-direction: column;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  gap: ${Spacings.SPACING_2B};
`;

const StyChevron = styled.div<{ $disableChevron: boolean }>`
  background: ${({ $disableChevron }) =>
    $disableChevron ? "var(--color-divider)" : "var(--color-base-1)"};
  cursor: ${({ $disableChevron }) =>
    $disableChevron ? "not-allowed" : "pointer"};
  border: 1px solid var(--color-divider);
  border-radius: ${Spacings.SPACING_2B};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${Spacings.SPACING_8B};
  width: ${Spacings.SPACING_8B};
`;

const Heading = styled(Typography)`
  ${mediaQuery.uptoMobile} {
    font-size: ${Fonts.H5};
    font-weight: ${Fonts.SEMIBOLD};
  }
`;

const SubHeading = styled(Typography)`
  color: var(--color-text-secondary);
`;

const ShowCaseContainer = styled.div`
  padding-left: ${Spacings.SPACING_4B};
`;

const WinnerCardShowCase = ({ laptopWinners, socialProofing }) => {
  const isMobile = useIsMobile();
  const cardWidth = isMobile
    ? defaultMwebWinnerCardWidth
    : defaultWebWinnerCardWidth;
  const showCaseLength = Object.keys(laptopWinners).length * cardWidth;
  const [transformState, setTransformState] = useState(0);
  const [transformDir, setTransformDir] = useState("");
  const currentUserData = laptopWinners.find(
    (winner) => winner.currentUserData === true
  );
  useEffect(() => {
    let intervalId = null;
    if (!currentUserData) {
      const showCaseElement = document.getElementById("winner-card-showcase");
      let transform = cardWidth;
      intervalId = setInterval(() => {
        transform -= cardWidth;
        showCaseElement.style.transition = "0.7s";
        if (transform < -showCaseLength) {
          showCaseElement.style.transition = "none";
          transform = 0;
          setTransformState(transform);
        }
        setTransformState(transform);
        showCaseElement.style.marginLeft = `${transform}px`;
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [cardWidth, currentUserData, showCaseLength]);

  useEffect(() => {
    const showCaseElement = document.getElementById("winner-card-showcase");
    if (transformDir === "next") {
      let transform = transformState - cardWidth * 3;
      if (transform < -showCaseLength) {
        transform = -showCaseLength;
      }
      showCaseElement.style.transition = "0.7s";
      showCaseElement.style.marginLeft = `${transform}px`;
      if (transform === -showCaseLength) {
        setTransformState(0);
        setTimeout(() => {
          showCaseElement.style.transition = "none";
          showCaseElement.style.marginLeft = "0px";
        }, 700);
      } else {
        setTransformState(transform);
      }
    }
    if (transformDir === "prev") {
      if (transformState !== 0) {
        const transform = transformState + cardWidth * 3;
        setTransformState(transform);
        showCaseElement.style.marginLeft = `${transform}px`;
      }
    }
    setTransformDir("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transformDir]);

  if (!Object.keys(socialProofing).length) return null;
  const { extraBlockInfo: { laptopWinnersCount = {} } = {} } = socialProofing;
  const showCaseDescription = `Showing 10 of ${numberFormatter(
    laptopWinnersCount
  )} winners`;
  let laptopWinnersData = laptopWinners;
  if (currentUserData) {
    laptopWinnersData = laptopWinnersData.filter(
      (item) => item.currentUserData !== true
    );
    laptopWinnersData = [
      ...laptopWinnersData,
      currentUserData,
      ...laptopWinnersData.slice(0, 3),
    ];
    laptopWinnersData = [currentUserData, ...laptopWinnersData];
  } else {
    laptopWinnersData = [
      ...laptopWinnersData,
      ...laptopWinnersData.slice(0, 4),
    ];
  }

  const disableChevron = transformState === 0;

  const prev = () => {
    setTransformDir("prev");
  };
  const nextClick = () => {
    setTransformDir("next");
  };

  return (
    <Wrapper>
      <SectionHeader>
        <InfoWrapper>
          <Heading variant="h4">Laptop winners</Heading>
          <SubHeading variant="p2">{showCaseDescription}</SubHeading>
        </InfoWrapper>
        {currentUserData && (
          <ArrowWrapper>
            <StyChevron onClick={prev} $disableChevron={disableChevron}>
              <LeftChevron height={20} width={20} />
            </StyChevron>
            <StyChevron onClick={nextClick} $disableChevron={false}>
              <RightChevron height={20} width={20} />
            </StyChevron>
          </ArrowWrapper>
        )}
      </SectionHeader>
      <ShowCaseContainer>
        <ShowCaseWrapper id="winner-card-showcase">
          {laptopWinnersData.map((item) =>
            item.currentUserData === false ? (
              <WinnerCard key={item} data={item} />
            ) : (
              <WinnerCard data={currentUserData} currentUser />
            )
          )}
        </ShowCaseWrapper>
      </ShowCaseContainer>
      <MwebBackgroundImageCover>
        <BackgroundWrapper>
          <Image
            src="referrals/WinnerCardShowCaseBg.svg"
            layout="fill"
            alt="offer"
          />
        </BackgroundWrapper>
      </MwebBackgroundImageCover>
    </Wrapper>
  );
};

export default WinnerCardShowCase;
