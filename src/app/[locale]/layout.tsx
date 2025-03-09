import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/general/header'
import Footer from '@/components/general/footer'
import '../globals.css'
import { Toaster } from 'sonner'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next'

type Params = { locale: string }

export async function generateMetadata({ params: { locale } }: { params: Params }): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: 'LM Speed',
			description: t('description'),
			type: 'website',
			locale: locale,
			url: 'https://lmspeed.net',
			siteName: 'LM Speed',
			images: t('ogImage'),
		},
		twitter: {
			card: 'summary_large_image',
			title: 'LM Speed',
			description: t('description'),
			creator: '@nexmoe',
			images: t('ogImage'),
		},
		metadataBase: new URL('https://lmspeed.net'),
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<Params>
}) {
	const { locale } = await params
	if (!routing.locales.includes(locale as never)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<head>
				<meta name="apple-mobile-web-app-title" content="LM Speed" />
			</head>
			<body className="bg-gray-50">
				<NuqsAdapter>
					<NextIntlClientProvider messages={messages}>
						<Header />
						<div className="py-32">{children}</div>
						<Footer />
						<Toaster richColors />
					</NextIntlClientProvider>
				</NuqsAdapter>
			</body>
			<GoogleAnalytics gaId="G-E16ZMWF868" />
		</html>
	)
}
