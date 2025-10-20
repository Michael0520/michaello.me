import { MorphingText } from '@/components/ui/morphing-text';
import { USER } from '@/features/profile/data/user';

import { Panel, PanelHeader, PanelTitle } from './panel';

export function Brand() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Brand</PanelTitle>
      </PanelHeader>

      <div className="flex min-h-[200px] items-center justify-center border-x border-edge px-8 py-12">
        <MorphingText
          texts={[USER.displayName, USER.jobTitle, ...USER.flipSentences]}
          className="text-4xl font-bold sm:text-6xl"
        />
      </div>
    </Panel>
  );
}
