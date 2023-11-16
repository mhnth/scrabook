'use client';

import { truncateStr } from '@/lib/utils';
import { useState } from 'react';

export default function NovelDesc({ html }: { html: string }) {
  const [moreDesc, setMoreDesc] = useState<boolean>(false);
  return (
    <div id="novel-desc" className="mt-8 text-sm">
      <p
        className="inline leading-7 dark:font-light"
        dangerouslySetInnerHTML={{ __html: truncateStr(html, 365, moreDesc) }}
      />
      <span
        className="ml-1 inline-block cursor-pointer font-semibold text-teal-900 dark:text-teal-500"
        onClick={() => setMoreDesc(!moreDesc)}
      >
        {' '}
        {moreDesc ? 'thu gọn' : 'xem thêm'}
      </span>
    </div>
  );
}
