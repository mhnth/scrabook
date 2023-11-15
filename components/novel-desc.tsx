'use client';

import { truncateStr } from '@/lib/utils';
import { useState } from 'react';

export default function NovelDesc({ html }: { html: string }) {
  const [moreDesc, setMoreDesc] = useState<boolean>(false);
  return (
    <div id="novel-desc" className="mt-8 text-sm">
      <p
        className="inline font-light leading-7"
        dangerouslySetInnerHTML={{ __html: truncateStr(html, 365, moreDesc) }}
      />
      <span
        className="ml-1 inline-block cursor-pointer text-center text-teal-500"
        onClick={() => setMoreDesc(!moreDesc)}
      >
        {' '}
        {moreDesc ? 'thu gọn' : 'xem thêm'}
      </span>
    </div>
  );
}
