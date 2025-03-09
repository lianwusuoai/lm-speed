'use client'

import { Link, usePathname } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Menu } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { useState } from 'react'

export default function Header() {
	const pathname = usePathname()
	const t = useTranslations('Header')
	const locale = useLocale()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const isActive = (path: string) => {
		return pathname === path ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
	}

	// Navigation items array
	const navItems = [
		{ path: '/', label: t('home') },
		{ path: '/nav', label: t('nav') },
		{ path: '/rank', label: t('rank') },
	]

	return (
		<header className="w-full bg-gray-50">
			<nav className="mx-auto container px-4 sm:px-6 lg:px-8">
				<div className="flex h-24 items-center justify-between">
					<Link
						href="/"
						className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors"
					>
						LM Speed
					</Link>
					<div className="hidden md:flex ml-10 items-center space-x-4">
						<Button variant="outline" asChild>
							<Link href="https://github.com/nexmoe/lm-speed/issues" target="_blank">{t('feedback')}</Link>
						</Button>
						{navItems.map((item) => (
							<Button
								key={item.path}
								variant="ghost"
								className={`${isActive(item.path)} hover:bg-gray-100 transition-colors`}
								asChild
							>
								<Link href={item.path}>{item.label}</Link>
							</Button>
						))}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<Globe className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{routing.locales.map((cur) => (
									<DropdownMenuItem key={cur} asChild>
										<Link href={pathname} locale={cur}>
											{cur}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="md:hidden">
						<Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
							<Menu className="h-6 w-6" />
						</Button>
					</div>
				</div>
				{isMenuOpen && (
					<div className="md:hidden py-4 space-y-2">
						{navItems.map((item) => (
							<Button
								key={item.path}
								variant="outline"
								className={`${isActive(item.path)} w-full justify-start transition-colors`}
								asChild
							>
								<Link href={item.path}>{item.label}</Link>
							</Button>
						))}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="w-full justify-start">
									<Globe className="h-4 w-4 mr-2" />
									{locale}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{routing.locales.map((cur) => (
									<DropdownMenuItem key={cur} asChild>
										<Link href={pathname} locale={cur}>
											{cur}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</nav>
		</header>
	)
}
