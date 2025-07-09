import './globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<head>
				<title>Catálogo de Produtos</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
