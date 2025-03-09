'use client'

import { Rocket, BarChart2, Clock, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

const featureIcons = {
	speedTesting: Clock,
	endpoint: Globe,
	analytics: BarChart2,
	streaming: Rocket,
}

const featureKeys = ['speedTesting', 'endpoint', 'analytics', 'streaming'] as const

export function ProductFeatures() {
	const t = useTranslations('Features')

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-base font-semibold leading-7 text-[#D74F36]">{t('sectionTitle')}</h2>
				<p className="mt-2 mx-auto max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					{t('title')}
				</p>
				<p className="mt-6 text-lg leading-8 text-gray-600">{t('subtitle')}</p>
			</div>
			<div className="mx-auto mt-12 max-w-2xl lg:max-w-none">
				<dl className="grid max-w-xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-4">
					{featureKeys.map((key) => {
						const Icon = featureIcons[key]
						return (
							<div key={key} className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
									<Icon className="h-5 w-5 flex-none text-[#D74F36]" aria-hidden="true" />
									{t(`items.${key}.name`)}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
									<p className="flex-auto">{t(`items.${key}.description`)}</p>
								</dd>
							</div>
						)
					})}
				</dl>
			</div>
		</div>
	)
}
