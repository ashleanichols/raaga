import * as React from "react";
import { useState } from "react";
import { Button } from "@components/Button";
import ModeToggle from "@components/ModeToggle";
import Icon from "@components/Icon";
import { VISUALIZER_MODE } from "@enums/visualizerMessages";
import { TrackList, TrackSelectionInfo } from "@components/TrackList";
import { IMidiJSON } from "@typings/midi";
import { GLOBAL_HEADER_HEIGHT } from "@config/piano";

interface GlobalHeaderProps {
  mode: VISUALIZER_MODE;
  onToggleMode: (mode: VISUALIZER_MODE) => void;
  onMidiAndTrackSelect: (midi: IMidiJSON, args: TrackSelectionInfo) => void;
}

const _GlobalHeader: React.FunctionComponent<GlobalHeaderProps> = ({
  mode,
  onToggleMode,
  onMidiAndTrackSelect
}) => {
  const [showTrackSelectionModal, toggleTrackSelectionModal] = useState(false);
  const [loadedMidi, setLoadedMidi] = useState();

  const onSelect = (info: TrackSelectionInfo) => {
    toggleTrackSelectionModal(false);
    onMidiAndTrackSelect(loadedMidi, info);
  };

  return (
    <header
      className="px-2 py-4 text-white flex flex-row items-center justify-between border-b"
      style={{
        height: GLOBAL_HEADER_HEIGHT,
        backgroundColor: "#232323",
        borderColor: "#131313"
      }}
    >
      <span>🎹</span>

      <div className="flex items-center">
        <Button
          icon="upload"
          onClick={() => toggleTrackSelectionModal(true)}
          className="mr-4 text-xs bg-gray-900 h-8"
          iconProps={{
            size: 10
          }}
        >
          Open File
        </Button>

        <ModeToggle mode={mode} onToggle={onToggleMode} disabled={false} />

        <a
          className="no-underline"
          target="_blank"
          href="https://github.com/ritz078/raaga"
        >
          <Icon name="github" color={"#fff"} size={23} />
        </a>
      </div>

      <TrackList
        visible={showTrackSelectionModal}
        midi={loadedMidi}
        onPlay={onSelect}
        onClose={() => toggleTrackSelectionModal(false)}
        setMidi={setLoadedMidi}
      />
    </header>
  );
};

export const GlobalHeader = React.memo(_GlobalHeader);
