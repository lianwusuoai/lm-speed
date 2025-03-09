'use client'

import { SpeedTestForm } from '@/components/speed-test-form'
import { ProductFeatures } from '@/components/home/product-features'
import { RecentTests } from '@/components/recent-tests'
import { FAQ } from '@/components/home/faq'
import { useTranslations } from 'next-intl'

export default function Home() {
	const t = useTranslations('HomePage')

	return (
		<div className="min-h-screen">
			<main className="space-y-48">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl font-bold text-center">{t('title')}</h1>
					<p className="my-4 max-w-2xl mx-auto text-lg text-center leading-6 text-gray-600">
						{t('subtitle')}
					</p>
					<SpeedTestForm />
				</div>
				<RecentTests />
				<ProductFeatures />
				<FAQ />
			</main>
		</div>
	)
}
