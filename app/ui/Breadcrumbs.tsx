import Link from 'next/link'
import { clsx } from 'clsx'

interface Breadcrumb {
  active?: boolean
  label: string
  href: string
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx('font-inter flex text-lg font-normal md:text-base')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500'
            )}
            aria-current={breadcrumb.active}
            key={breadcrumb.href}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
