import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)
  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article
      className={` ${COVER_HOVER_ENLARGE} ? ' hover:transition-all duration-150' : ''}`}>
      {/* 文章卡片容器 */}
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS ? '2xl:h-80 2xl:flex-col' : '') + // 高度从 h-96 → h-80
          ' wow fadeInUp border bg-white dark:bg-[#1e1e1e] flex mb-4 flex-col h-[18rem] md:h-44 md:flex-row group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors justify-between overflow-hidden rounded-xl'
        }>

        {/* 图片封面 */}
        {showPageCover && (
          <Link href={post?.href} passHref legacyBehavior>
            <a className={
                (POST_TWO_COLS ? '2xl:w-full' : '') +
                ' w-full md:w-5/12 overflow-hidden cursor-pointer select-none'
              }>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-300 ease-in-out' // 缩短动画时间
              />
            </a>
          </Link>
        )}

        {/* 文字区块 */}
        <div className={
            (POST_TWO_COLS ? '2xl:p-4 2xl:h-48 2xl:w-full' : '') +
            ' flex p-4 flex-col justify-between h-48 md:h-full w-full md:w-7/12 space-y-2' // 减少内边距 p-6 → p-4，添加紧凑间距
          }>

          {/* 标题区块 */}
          <div className="min-h-[4.5rem] mb-2"> {/* 减少垂直间距 */}
            <Link
              href={post?.href}
              passHref
              className={
                'line-clamp-2 text-xl font-bold leading-snug hover:text-indigo-700 dark:hover:text-yellow-600 dark:text-gray-100'
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                icon={post.pageIcon}
                className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]" // 专门为 Heo 主题的图标设置样式
              />
              )}
              <span className='menu-link'>{post.title}</span>
            </Link>
          </div>

            {/* 新增的日期和分类区块 */}
            <div className='flex flex-wrap items-center justify-between gap-4 mb-2'>
              {/* 分类 */}
              {post.category && (
                <Link
                  href={`/category/${post.category}`}
                  className='flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors'
                >
                  <i className='far fa-folder mr-1' />
                  {post.category}
                </Link>
              )}

              {/* 日期 */}
              {post.date?.start_date && (
                 <Link
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                  className='flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors'>
                <i className='far fa-clock mr-1' />
                {post.date?.start_date || post.lastEditedDay}
                </Link>
              )}
            </div>

          {/* 文章标签 */}
          <div className='flex flex-wrap gap-2 mt-2'>
            {post.tagItems?.map(tag => <TagItemMini key={tag.name} tag={tag} />)}
          </div>
          </div>
      </div>
    </article>
  )
}

export default BlogPostCard
