import { createStyles, withStyles, WithStyles } from "@mui/styles";
import React from "react";
import {
  BoundingClientRectNumberPropertyName,
  getRectNumberProperty,
  setCSSHTMLReference,
} from "./utils";

const { HEIGHT, TOP, BOTTOM } = BoundingClientRectNumberPropertyName;

const styles = () =>
  createStyles({
    spaceDiv: {
      minHeight: 0,
    },
    stickyContainer: {
      position: "sticky",
    },
    stickyDivParent: {
      position: "relative",
      height: "100%",
      flexGrow: 1,
    },
  });

type Props = WithStyles<typeof styles> & {
  maxHeight?: number;
  turnOff?: boolean;
  topSpace: number;
  bottomSpace: number;
};

class StickySideBar extends React.Component<Props> {
  mContentDivRef = React.createRef<HTMLDivElement>();
  mSpaceDivRef = React.createRef<HTMLDivElement>();
  mStickyDivParentRef = React.createRef<HTMLDivElement>();

  mMaxSpaceDivHeight = 0;
  mLastScrollPosition = 0;

  componentDidMount() {
    const { turnOff } = this.props;

    this.setupHeightForSpaceDiv();

    !turnOff &&
      document.addEventListener("scroll", this.setStyleContentDivAndSpaceDiv);
  }

  componentDidUpdate(prevProps: Props) {
    const { turnOff } = this.props;
    const { turnOff: prevTurnOff } = prevProps;

    if (turnOff !== prevTurnOff) {
      if (turnOff) {
        document.removeEventListener(
          "scroll",
          this.setStyleContentDivAndSpaceDiv
        );
      } //
      else {
        document.addEventListener("scroll", this.setStyleContentDivAndSpaceDiv);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.setStyleContentDivAndSpaceDiv);
  }

  isContentHittingTopLimit = (): boolean => {
    const { mContentDivRef } = this;
    const { topSpace } = this.props;
    return getRectNumberProperty(mContentDivRef, TOP) - topSpace === 0;
  };

  isContentHittingBottomLimit = (): boolean => {
    const { mContentDivRef } = this;
    const { bottomSpace } = this.props;
    return (
      window.innerHeight -
        (getRectNumberProperty(mContentDivRef, BOTTOM) + bottomSpace) >=
      0
    );
  };

  isContentAtTopOfStickyParent = (): boolean => {
    const { mContentDivRef, mSpaceDivRef } = this;
    return (
      getRectNumberProperty(mContentDivRef, TOP) -
        getRectNumberProperty(mSpaceDivRef, TOP) <
      1
    );
  };

  isContentBelowTopLimit = (): boolean => {
    const { mContentDivRef } = this;
    const { topSpace } = this.props;
    return getRectNumberProperty(mContentDivRef, TOP) - topSpace > 0;
  };

  calculateMaxSpaceDivHeight = (): number => {
    const { mContentDivRef, mStickyDivParentRef } = this;
    return (
      getRectNumberProperty(mStickyDivParentRef, HEIGHT) -
      getRectNumberProperty(mContentDivRef, HEIGHT)
    );
  };

  setHeightSpaceDiv = () => {
    const { mContentDivRef, mSpaceDivRef } = this;

    setCSSHTMLReference(mSpaceDivRef, {
      height: `${Math.abs(
        getRectNumberProperty(mContentDivRef, TOP) -
          getRectNumberProperty(mSpaceDivRef, TOP)
      )}px`,
      maxHeight: `${this.calculateMaxSpaceDivHeight()}px`,
    });
  };

  handleScrollingDown = () => {
    const { mContentDivRef, mSpaceDivRef } = this;
    const { bottomSpace } = this.props;

    if (this.isContentBelowTopLimit()) {
      setCSSHTMLReference(mSpaceDivRef, { height: 0 });
      setCSSHTMLReference(mContentDivRef, { bottom: "unset", top: "unset" });
      return;
    }

    if (this.isContentHittingTopLimit()) {
      this.setHeightSpaceDiv();
    }

    const extraBottomSpaceAddingToTop =
      getRectNumberProperty(mContentDivRef, BOTTOM) + bottomSpace;

    const newTop =
      getRectNumberProperty(mContentDivRef, TOP) +
      window.innerHeight -
      extraBottomSpaceAddingToTop;

    setCSSHTMLReference(mContentDivRef, {
      top: `${newTop}px`,
      bottom: "unset",
    });
  };

  handleScrollingUp = () => {
    const { mContentDivRef, mSpaceDivRef } = this;
    const { topSpace } = this.props;

    if (this.isContentAtTopOfStickyParent()) {
      setCSSHTMLReference(mSpaceDivRef, { height: 0 });
      setCSSHTMLReference(mContentDivRef, { bottom: "unset", top: "unset" });
      return;
    }

    if (this.isContentHittingBottomLimit()) {
      this.setHeightSpaceDiv();
    }

    const newBottom =
      window.innerHeight -
      getRectNumberProperty(mContentDivRef, BOTTOM) +
      getRectNumberProperty(mContentDivRef, TOP) -
      topSpace;

    setCSSHTMLReference(mContentDivRef, {
      bottom: `${newBottom}px`,
      top: "unset",
    });
  };

  setStyleContentDivAndSpaceDiv = () => {
    const { mContentDivRef } = this;
    const { topSpace, bottomSpace } = this.props;

    // https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const isScrollingDown = scrollTop > this.mLastScrollPosition;
    const isScrollingUp = scrollTop < this.mLastScrollPosition;

    const isContentDivSmallerThanViewport =
      getRectNumberProperty(mContentDivRef, HEIGHT) <
      window.innerHeight - (topSpace + bottomSpace);

    if (isContentDivSmallerThanViewport) {
      setCSSHTMLReference(mContentDivRef, {
        position: "sticky",
        top: topSpace,
      });
    }
    //
    else {
      if (isScrollingDown) {
        this.handleScrollingDown();
      }

      if (isScrollingUp) {
        this.handleScrollingUp();
      }
    }

    // Store last scroll
    this.mLastScrollPosition = scrollTop <= 0 ? 0 : scrollTop;
  };

  setupHeightForSpaceDiv = () => {
    const { mSpaceDivRef } = this;
    setCSSHTMLReference(mSpaceDivRef, {
      height: 0,
      maxHeight: `${this.calculateMaxSpaceDivHeight()}px`,
    });
  };

  render(): JSX.Element {
    const { classes, maxHeight } = this.props;
    const { mContentDivRef, mSpaceDivRef, mStickyDivParentRef } = this;

    return (
      <div
        ref={mStickyDivParentRef}
        className={classes.stickyDivParent}
        style={{
          maxHeight
        }}
      >
        <div ref={mSpaceDivRef} className={classes.spaceDiv} />

        <div ref={mContentDivRef} className={classes.stickyContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StickySideBar);
