-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/09/2025 às 17:46
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `telasdb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alto_falante`
--

CREATE TABLE `alto_falante` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `alto_falante`
--

INSERT INTO `alto_falante` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 4', NULL, 15.00),
(2, 'iPhone 4S', NULL, 15.00),
(3, 'iPhone 5', NULL, 15.00),
(4, 'iPhone 6', NULL, 15.00),
(5, 'iPhone 6 Plus', NULL, 15.00),
(6, 'iPhone 6S Plus', NULL, 15.00),
(7, 'iPhone 7', NULL, 15.00),
(8, 'iPhone 7 Plus', NULL, 15.00),
(9, 'iPhone 8', NULL, 15.00),
(10, 'iPhone 8 Plus', NULL, 15.00),
(11, 'iPhone 6S', NULL, 15.00),
(12, 'iPhone 11 Pro Max', NULL, 40.00),
(13, 'iPhone XS Max', NULL, 25.00),
(14, 'E22', NULL, 15.00),
(15, 'G32', NULL, 15.00),
(16, 'G10', NULL, 15.00),
(17, 'G04', NULL, 15.00),
(18, 'G20', NULL, 15.00),
(19, 'G24', NULL, 15.00),
(20, 'G41', NULL, 15.00),
(21, 'G54', NULL, 15.00),
(22, 'G82', NULL, 15.00),
(23, 'G52', NULL, 15.00),
(24, 'G53', NULL, 15.00),
(25, 'G30', NULL, 15.00),
(26, 'G34', NULL, 15.00),
(27, 'G22', NULL, 15.00),
(28, 'G23', NULL, 15.00),
(29, 'G42', NULL, 15.00),
(30, 'G7', NULL, 15.00),
(31, 'G7 PLAY', NULL, 15.00),
(32, 'G8', NULL, 15.00),
(33, 'G8 POWER', NULL, 15.00),
(34, 'G8 PLUS', NULL, 15.00),
(35, 'G9 PLAY', NULL, 15.00),
(36, 'G9 PLUS', NULL, 15.00),
(37, 'G8 PLAY', NULL, 15.00),
(38, 'G5S', NULL, 15.00),
(39, 'E6 PLUS', NULL, 15.00),
(40, 'ONE HYPER', NULL, 15.00),
(41, 'ONE MACRO', NULL, 15.00),
(42, 'A20S', NULL, 15.00),
(43, 'A03S', NULL, 15.00),
(44, 'A21S', NULL, 15.00),
(45, 'S20FE', NULL, 15.00),
(46, 'A01', NULL, 15.00),
(47, 'A70', NULL, 15.00),
(48, 'A10', NULL, 15.00),
(49, 'A51', NULL, 15.00),
(50, 'M51', NULL, 15.00),
(51, 'M52', NULL, 15.00),
(52, 'A04E', NULL, 15.00),
(53, 'J8', NULL, 15.00),
(54, 'J6', NULL, 15.00),
(55, 'G530', NULL, 15.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `auricular`
--

CREATE TABLE `auricular` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `auricular`
--

INSERT INTO `auricular` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 7 Plus', NULL, 5.00),
(2, 'iPhone 8 Plus', NULL, 5.00),
(3, 'iPhone X', NULL, 45.00),
(4, 'iPhone XR', NULL, 45.00),
(5, 'iPhone XS', NULL, 45.00),
(6, 'iPhone XS Max', NULL, 50.00),
(7, 'iPhone 11', NULL, 50.00),
(8, 'iPhone 11 Pro', NULL, 60.00),
(9, 'iPhone 11 Pro Max', NULL, 65.00),
(10, 'iPhone 12', NULL, 60.00),
(11, 'iPhone 12 Pro', NULL, 60.00),
(12, 'iPhone 12 Pro Max', NULL, 65.00),
(13, 'iPhone 13', NULL, 55.00),
(14, 'iPhone 13 Pro', NULL, 55.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `baterias`
--

CREATE TABLE `baterias` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `baterias`
--

INSERT INTO `baterias` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'A01', NULL, 60.00),
(2, 'A02', NULL, 60.00),
(3, 'A02S', NULL, 60.00),
(4, 'A03', NULL, 60.00),
(5, 'A03 CORE', NULL, 60.00),
(6, 'A03S', NULL, 60.00),
(7, 'A05', NULL, 60.00),
(8, 'A06', NULL, 60.00),
(9, 'A10', NULL, 60.00),
(10, 'A10S', NULL, 60.00),
(11, 'A11', NULL, 60.00),
(12, 'A14', '4G', 60.00),
(13, 'A20', NULL, 60.00),
(14, 'A20S', NULL, 60.00),
(15, 'A21S', NULL, 60.00),
(16, 'A22', '4G', 60.00),
(17, 'A22', '5G', 60.00),
(18, 'A23', NULL, 60.00),
(19, 'A30', NULL, 60.00),
(20, 'A31', NULL, 60.00),
(21, 'A32', NULL, 60.00),
(22, 'A34', NULL, 60.00),
(23, 'A35', NULL, 60.00),
(24, 'A42', NULL, 60.00),
(25, 'A50', NULL, 60.00),
(26, 'A51', NULL, 60.00),
(27, 'A52', NULL, 60.00),
(28, 'A53', NULL, 60.00),
(29, 'A54', NULL, 60.00),
(30, 'A70', NULL, 60.00),
(31, 'A71', NULL, 60.00),
(32, 'A72', NULL, 60.00),
(33, 'A73', NULL, 60.00),
(34, 'A750', NULL, 60.00),
(35, 'G781', NULL, 60.00),
(36, 'M14', NULL, 60.00),
(37, 'M20', NULL, 60.00),
(38, 'M30', NULL, 60.00),
(39, 'M33', NULL, 60.00),
(40, 'M51', NULL, 60.00),
(41, 'M52', NULL, 60.00),
(42, 'M53', NULL, 60.00),
(43, 'M54', NULL, 60.00),
(44, 'M56', NULL, 60.00),
(45, 'M62', NULL, 60.00),
(46, 'NOTE 20', NULL, 60.00),
(47, 'NOTE 20 ULTRA', NULL, 60.00),
(48, 'S10', NULL, 60.00),
(49, 'S10 PLUS', NULL, 60.00),
(50, 'S20', NULL, 60.00),
(51, 'S20 PLUS', NULL, 60.00),
(52, 'S20 ULTRA', NULL, 60.00),
(53, 'S21', NULL, 60.00),
(54, 'S21 FE', NULL, 60.00),
(55, 'S21 PLUS', NULL, 60.00),
(56, 'S21 ULTRA', NULL, 60.00),
(57, 'S22', NULL, 60.00),
(58, 'S22 PLUS', NULL, 60.00),
(59, 'S22 ULTRA', NULL, 60.00),
(60, 'S23', NULL, 60.00),
(61, 'S6', NULL, 60.00),
(62, 'G14', 'PC50', 60.00),
(63, 'G54', 'PC50', 60.00),
(64, 'E20', 'NT40', 60.00),
(65, 'E22', 'NH40', 60.00),
(66, 'E6 PLAY', 'KS40', 60.00),
(67, 'E6S', 'KS40', 60.00),
(68, 'E6I', 'KS40', 60.00),
(69, 'E6 PLUS', 'KC40', 60.00),
(70, 'EDGE', 'LR50', 60.00),
(71, 'EDGE 20', 'MB40', 60.00),
(72, 'EDGE 20 LITE', 'NT50', 60.00),
(73, 'EDGE 30', 'ND40', 60.00),
(74, 'EDGE 30 FUSION', 'NP44', 60.00),
(75, 'EDGE 30 NEO', 'NP40', 60.00),
(76, 'EDGE 30 ULTRA', 'NF45', 60.00),
(77, 'EDGE 40 NEO', 'QM50', 60.00),
(78, 'EDGE 50 FUSION', 'QC50', 60.00),
(79, 'G22', 'NH50', 60.00),
(80, 'G13', 'NH50', 60.00),
(81, 'G53', 'NH50', 60.00),
(82, 'E32', 'NH50', 60.00),
(83, 'E13', 'NH50', 60.00),
(84, 'E32S', 'NH50', 60.00),
(85, 'G23', 'PH50', 60.00),
(86, 'G24', 'QF50', 60.00),
(87, 'G50 5G', 'MS50', 60.00),
(88, 'G52', 'NE50', 60.00),
(89, 'G5G', 'MK50', 60.00),
(90, 'G5G PLUS', 'LZ50', 60.00),
(91, 'G6 PLAY', 'BL270', 60.00),
(92, 'G60', 'MC50', 60.00),
(93, 'G9 POWER', 'MC50', 60.00),
(94, 'G60S', 'LK50', 60.00),
(95, 'G62', 'ND50', 60.00),
(96, 'G7 PLAY - ONE', 'JE40', 60.00),
(97, 'G7 POWER', 'JK50', 60.00),
(98, 'G8 POWER LITE', 'JK50', 60.00),
(99, 'G9 PLAY', 'JK50', 60.00),
(100, 'G10', 'JK50', 60.00),
(101, 'G73', 'PV50', 60.00),
(102, 'G75', 'RW50', 60.00),
(103, 'G8 PLUS', 'KD40', 60.00),
(104, 'G8 PLAY', 'KD40', 60.00),
(105, 'ONE MACRO', 'KD40', 60.00),
(106, 'G8', 'KD40', 60.00),
(107, 'E7', 'KD40', 60.00),
(108, 'G8 POWER', 'KZ50', 60.00),
(109, 'G84', 'QB50', 60.00),
(110, 'G85', 'QE50', 60.00),
(111, 'G9 PLUS', 'MG50', 60.00),
(112, 'ONE HYPER', 'KG50', 60.00),
(113, 'ONE VISION', 'KR40', 60.00),
(114, 'ONE ZOOM', 'KP50', 60.00),
(115, 'Z3 PLAY', 'JS40', 60.00),
(116, 'IPHONE 6', NULL, 60.00),
(117, 'IPHONE 6S', NULL, 60.00),
(118, 'IPHONE 6S PLUS', NULL, 75.00),
(119, 'IPHONE 7', NULL, 65.00),
(120, 'IPHONE 7 PLUS', NULL, 75.00),
(121, 'IPHONE 8', NULL, 65.00),
(122, 'IPHONE 8 PLUS', NULL, 80.00),
(123, 'IPHONE X', NULL, 105.00),
(124, 'IPHONE XS', NULL, 105.00),
(125, 'IPHONE 11', NULL, 110.00),
(126, 'IPHONE XR', NULL, 100.00),
(127, 'IPHONE XS MAX', NULL, 115.00),
(128, 'IPHONE 11 PRO', NULL, 125.00),
(129, 'IPHONE 11 PRO MAX', NULL, 135.00),
(130, 'IPHONE 12', NULL, 120.00),
(131, 'IPHONE 12 PRO', NULL, 120.00),
(132, 'IPHONE 12 PRO MAX', NULL, 140.00),
(133, 'Note 7', 'BN4A', 60.00),
(134, 'Note 7 Pro', 'BN4A', 60.00),
(135, 'Note 8', 'BN46', 60.00),
(136, 'Note 8 Pro', 'BM4J', 60.00),
(137, 'Redmi 9', 'BN54', 60.00),
(138, 'Note 9', 'BN54', 60.00),
(139, 'Redmi 9A', 'BN56', 60.00),
(140, 'Redmi 9C', 'BN56', 60.00),
(141, 'Note 9 Pro', 'BN55', 60.00),
(142, 'Note 9S', 'BN55', 60.00),
(143, 'Note 9 Pro', 'BN52', 60.00),
(144, 'Note 10 4G', 'BN59', 60.00),
(145, 'Redmi 10', 'BN59', 60.00),
(146, 'Note 12 4G', 'BN5M', 60.00),
(147, 'Mi A3', 'BM4F', 60.00),
(148, 'Mi 9 Lite', 'BM4F', 60.00),
(149, 'Mi A2 Lite', 'BP41', 60.00),
(150, 'K20', 'BP41', 60.00),
(151, 'Redmi 9T', 'BN62', 60.00),
(152, 'Poco M3', 'BN62', 60.00),
(153, 'Poco X3', 'BN57', 60.00),
(154, 'Poco X3 Pro', 'BN57', 60.00),
(155, 'Mi 9', 'BM3L', 60.00),
(156, 'Redmi 12', 'BM5R', 60.00),
(157, 'C30s', 'BLP877', 60.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `camera_frontal`
--

CREATE TABLE `camera_frontal` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `camera_frontal`
--

INSERT INTO `camera_frontal` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 5SE', NULL, 35.00),
(2, 'iPhone 5C', NULL, 20.00),
(3, 'iPhone 5', NULL, 20.00),
(4, 'iPhone 6', NULL, 20.00),
(5, 'iPhone 6S', NULL, 25.00),
(6, 'iPhone 6 Plus', NULL, 25.00),
(7, 'iPhone 6S Plus', NULL, 25.00),
(8, 'iPhone 7', NULL, 25.00),
(9, 'iPhone 7 Plus', NULL, 25.00),
(10, 'iPhone 8', NULL, 25.00),
(11, 'iPhone 8 Plus', NULL, 25.00),
(12, 'iPhone X', NULL, 30.00),
(13, 'iPhone XS', NULL, 30.00),
(14, 'iPhone XR', NULL, 30.00),
(15, 'iPhone 11', NULL, 30.00),
(16, 'A10S', NULL, 25.00),
(17, 'A20S', NULL, 25.00),
(18, 'J7 PRIME', NULL, 25.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `camera_traseira`
--

CREATE TABLE `camera_traseira` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `camera_traseira`
--

INSERT INTO `camera_traseira` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone', NULL, 0.00),
(2, 'iPhone 6', NULL, 25.00),
(3, 'iPhone 6S', NULL, 35.00),
(4, 'iPhone 6S Plus', NULL, 35.00),
(5, 'iPhone 6 Plus', NULL, 35.00),
(6, 'iPhone 7', NULL, 100.00),
(7, 'iPhone 7 Plus', NULL, 170.00),
(8, 'iPhone 8', NULL, 170.00),
(9, 'iPhone 8 Plus', NULL, 180.00),
(10, 'iPhone SE 2020', NULL, 65.00),
(11, 'iPhone X', NULL, 100.00),
(12, 'iPhone XR', NULL, 130.00),
(13, 'iPhone 11', NULL, 140.00),
(14, 'iPhone 12', NULL, 190.00),
(15, 'J8', NULL, 25.00),
(16, 'A20', NULL, 35.00),
(17, 'A10', NULL, 25.00),
(18, 'J7 PRIME', NULL, 25.00),
(19, 'A12', NULL, 35.00),
(20, 'A50', NULL, 35.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `numero` varchar(30) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `numero`, `nome`) VALUES
(2, '5512981964272@s.whatsapp.net', 'Loja V10'),
(3, '5512981895318@s.whatsapp.net', 'João Lucas'),
(4, '5512991235862@s.whatsapp.net', 'aleky'),
(5, '551231324182@s.whatsapp.net', 'loja 2'),
(6, '5512992568744@s.whatsapp.net', 'Pedro Paulo'),
(7, '5512997377620@s.whatsapp.net', 'Daniel Godoy');

-- --------------------------------------------------------

--
-- Estrutura para tabela `conector`
--

CREATE TABLE `conector` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `conector`
--

INSERT INTO `conector` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 4', NULL, 20.00),
(2, 'iPhone 5G', NULL, 20.00),
(3, 'iPhone 5S', NULL, 20.00),
(4, 'iPhone 5C', NULL, 20.00),
(5, 'iPhone 5SE', NULL, 20.00),
(6, 'iPhone 6G', NULL, 20.00),
(7, 'iPhone 6S', NULL, 25.00),
(8, 'iPhone 6S Plus', NULL, 25.00),
(9, 'iPhone 6 Plus', NULL, 25.00),
(10, 'iPhone 7', NULL, 30.00),
(11, 'iPhone 7 Plus', NULL, 35.00),
(12, 'iPhone 8', NULL, 35.00),
(13, 'iPhone 8 Plus', NULL, 35.00),
(14, 'iPhone SE 2020', NULL, 60.00),
(15, 'iPhone iPad', NULL, 35.00),
(16, 'iPhone XS Max', NULL, 50.00),
(17, 'iPhone XS', NULL, 50.00),
(18, 'iPhone XR', NULL, 35.00),
(19, 'iPhone X', NULL, 40.00),
(20, 'iPhone 11', NULL, 45.00),
(21, 'iPhone 11 Pro', NULL, 160.00),
(22, 'iPhone 11 Pro Max', 'PA', 25.00),
(23, 'iPhone 11 Pro Max', 'ORI', 180.00),
(24, 'iPhone 12', NULL, 65.00),
(25, 'iPhone 12 Pro', NULL, 65.00),
(26, 'iPhone 13', NULL, 80.00),
(27, 'iPhone 13 Pro', NULL, 80.00),
(28, 'iPhone 13 Pro Max', NULL, 80.00),
(29, 'iPhone 14', NULL, 65.00),
(30, 'iPhone 14 Pro', NULL, 75.00),
(31, 'iPhone 14 Pro Max', NULL, 80.00),
(32, 'iPhone 12 Pro Max', NULL, 50.00),
(33, 'E4', NULL, 25.00),
(34, 'E4 PLUS', NULL, 15.00),
(35, 'E5 PLAY', NULL, 15.00),
(36, 'E5 PLUS', NULL, 15.00),
(37, 'E6 PLAY', NULL, 30.00),
(38, 'E6 PLUS', NULL, 25.00),
(39, 'E6S', NULL, 20.00),
(40, 'E7', NULL, 40.00),
(41, 'E7 PLUS', NULL, 20.00),
(42, 'E7 POWER', NULL, 25.00),
(43, 'E13', NULL, 25.00),
(44, 'E20', NULL, 40.00),
(45, 'E22', NULL, 25.00),
(46, 'E32', NULL, 25.00),
(47, 'E40', NULL, 40.00),
(48, 'G4 PLAY', NULL, 10.00),
(49, 'G5', NULL, 10.00),
(50, 'G6 PLAY', NULL, 25.00),
(51, 'G8', NULL, 40.00),
(52, 'G8 PLAY TURBO', 'turbo', 35.00),
(53, 'G8 PLAY M', 'm', 20.00),
(54, 'G8 PLUS TURBO', 'turbo', 20.00),
(55, 'G8 PLUS M', 'm', 20.00),
(56, 'G8 POWER LITE', NULL, 20.00),
(57, 'G8 POWER', NULL, 25.00),
(58, 'G9 PLAY', NULL, 25.00),
(59, 'G9 PLUS', NULL, 40.00),
(60, 'G9 POWER', NULL, 25.00),
(61, 'G52', NULL, 25.00),
(62, 'G53', NULL, 25.00),
(63, 'G54', NULL, 25.00),
(64, 'G50 5G', '5g', 40.00),
(65, 'G60', NULL, 25.00),
(66, 'G60S', NULL, 25.00),
(67, 'G62', NULL, 25.00),
(68, 'G71', NULL, 25.00),
(69, 'G73', NULL, 25.00),
(70, 'G75', NULL, 25.00),
(71, 'G84', NULL, 25.00),
(72, 'G85', NULL, 25.00),
(73, 'G100', NULL, 25.00),
(74, 'G200', NULL, 25.00),
(75, 'MOTO ONE', NULL, 20.00),
(76, 'ONE ACTION', NULL, 20.00),
(77, 'ONE FUSION', NULL, 25.00),
(78, 'ONE HYPER', NULL, 40.00),
(79, 'EDGE 20 LITE', NULL, 25.00),
(80, 'EDGE 20', NULL, 25.00),
(81, 'EDGE 30', NULL, 25.00),
(82, 'EDGE 30 NEO', NULL, 35.00),
(83, 'EDGE 30 FUSION', NULL, 35.00),
(84, 'ONE VISION', NULL, 20.00),
(85, 'EDGE PLUS', NULL, 70.00),
(86, 'EDGE 40 NEO', NULL, 30.00),
(87, 'G10', NULL, 40.00),
(88, 'G20', NULL, 40.00),
(89, 'G34', NULL, 25.00),
(90, 'G41', NULL, 25.00),
(91, 'G31', NULL, 25.00),
(92, 'G14', NULL, 25.00),
(93, 'G23', NULL, 25.00),
(94, 'G04', NULL, 25.00),
(95, 'G04S', NULL, 25.00),
(96, 'G24', NULL, 25.00),
(97, 'G30', NULL, 25.00),
(98, 'G05', NULL, 25.00),
(99, 'G35', NULL, 25.00),
(100, 'G22', NULL, 25.00),
(101, 'G42', NULL, 25.00),
(102, 'G32', NULL, 25.00),
(103, 'G5G PLUS', NULL, 40.00),
(104, 'G13', NULL, 25.00),
(105, 'X4', NULL, 25.00),
(106, 'A01', NULL, 20.00),
(107, 'A02', NULL, 20.00),
(108, 'A02S', NULL, 25.00),
(109, 'A03S', NULL, 25.00),
(110, 'A03', NULL, 20.00),
(111, 'A03 CORE', NULL, 20.00),
(112, 'A04E', NULL, 25.00),
(113, 'A04S', NULL, 25.00),
(114, 'A05', NULL, 25.00),
(115, 'A05S', NULL, 25.00),
(116, 'A06', NULL, 25.00),
(117, 'A10', NULL, 20.00),
(118, 'A10S', 'm15', 20.00),
(119, 'A10S', 'm16', 20.00),
(120, 'A11', NULL, 25.00),
(121, 'A12', NULL, 25.00),
(122, 'M12', NULL, 25.00),
(123, 'A13', NULL, 25.00),
(124, 'M13', NULL, 25.00),
(125, 'A14', '4g', 30.00),
(126, 'A14', '5g', 30.00),
(127, 'A15', '4g', 30.00),
(128, 'A16', '4g', 30.00),
(129, 'A16', '5g', 30.00),
(130, 'T500', NULL, 30.00),
(131, 'T510', NULL, 35.00),
(132, 'A20S', 'm14', 25.00),
(133, 'A20S', 'm12', 25.00),
(134, 'A20', NULL, 25.00),
(135, 'A21S', NULL, 25.00),
(136, 'A22', '5g', 25.00),
(137, 'A31', NULL, 25.00),
(138, 'A32', NULL, 25.00),
(139, 'A33', '5g', 40.00),
(140, 'A30', NULL, 25.00),
(141, 'A34', '5g', 35.00),
(142, 'A24', NULL, 35.00),
(143, 'A30S', NULL, 25.00),
(144, 'A22', '4g', 25.00),
(145, 'A23', '4g', 30.00),
(146, 'A80', NULL, 65.00),
(147, 'A71', NULL, 45.00),
(148, 'A70', NULL, 40.00),
(149, 'A54', NULL, 35.00),
(150, 'A53', NULL, 35.00),
(151, 'A52', NULL, 65.00),
(152, 'A51', NULL, 40.00),
(153, 'A50', NULL, 30.00),
(154, 'NOTE 10', NULL, 30.00),
(155, 'A72', NULL, 75.00),
(156, 'A73', NULL, 35.00),
(157, 'M53', '5g', 40.00),
(158, 'A55', NULL, 35.00),
(159, 'S21FE', NULL, 65.00),
(160, 'S21', NULL, 60.00),
(161, 'S21 PLUS', NULL, 65.00),
(162, 'S10 LITE', NULL, 35.00),
(163, 'S22', NULL, 60.00),
(164, 'S22 ULTRA', NULL, 80.00),
(165, 'S20', NULL, 60.00),
(166, 'S20FE', NULL, 55.00),
(167, 'S23', NULL, 65.00),
(168, 'S23 ULTRA', NULL, 85.00),
(169, 'NOTE 10 LITE', NULL, 35.00),
(170, 'M55', NULL, 35.00),
(171, 'M22', NULL, 25.00),
(172, 'M32', NULL, 25.00),
(173, 'M20', NULL, 20.00),
(174, 'M21S', NULL, 25.00),
(175, 'M31', NULL, 25.00),
(176, 'M30', NULL, 25.00),
(177, 'M23', '5g', 30.00),
(178, 'M33', '5g', 30.00),
(179, 'M51', NULL, 35.00),
(180, 'M54', NULL, 40.00),
(181, 'M10', NULL, 20.00),
(182, 'Mi 9 Lite', NULL, 40.00),
(183, 'Mi 9T', NULL, 30.00),
(184, 'Mi 11T', NULL, 35.00),
(185, 'Mi 8', NULL, 30.00),
(186, 'Mi 9', NULL, 45.00),
(187, 'Mi A3', NULL, 25.00),
(188, 'Mi 9 SE', NULL, 45.00),
(189, 'Mi 11 Lite', NULL, 30.00),
(190, 'Mi 8 Lite', NULL, 25.00),
(191, 'Mi A2 Lite', NULL, 25.00),
(192, 'Redmi A2', NULL, 25.00),
(193, 'Redmi A1', NULL, 25.00),
(194, 'Redmi A1 Plus', NULL, 25.00),
(195, 'Redmi 9A', NULL, 25.00),
(196, 'Redmi 9C', NULL, 25.00),
(197, 'Poco X5', NULL, 30.00),
(198, 'Redmi 10', NULL, 25.00),
(199, 'Poco C75', NULL, 25.00),
(200, 'Redmi 14C', NULL, 25.00),
(201, 'Poco F5 Pro', NULL, 40.00),
(202, 'Redmi 9', NULL, 25.00),
(203, 'Poco F3', NULL, 30.00),
(204, 'Poco X7', NULL, 35.00),
(205, 'Poco X6 Pro', NULL, 35.00),
(206, 'Poco X6', NULL, 35.00),
(207, 'Note 13 Pro', '5g', 35.00),
(208, 'Redmi 13C', NULL, 25.00),
(209, 'Poco X3', NULL, 25.00),
(210, 'Poco X3 Pro', NULL, 25.00),
(211, 'Redmi 12C', NULL, 25.00),
(212, 'Redmi 12', NULL, 25.00),
(213, 'Redmi 10C', NULL, 25.00),
(214, 'Redmi 9T', NULL, 25.00),
(215, 'Poco M3', NULL, 25.00),
(216, 'Note 12', '4g', 30.00),
(217, 'Note 12 Pro', '5g', 35.00),
(218, 'Poco X5 Pro', '5g', 35.00),
(219, 'Note 10', '4g', 25.00),
(220, 'Note 7', NULL, 25.00),
(221, 'Note 6 Pro', NULL, 25.00),
(222, 'Note 12', '5g', 30.00),
(223, 'Note 11', '5g', 25.00),
(224, 'Note 8', NULL, 25.00),
(225, 'Note 9', NULL, 25.00),
(226, 'Note 12 Pro', '4g', 35.00),
(227, 'X4 Pro', '5g', 35.00),
(228, 'Mi Note 10 Pro', NULL, 25.00),
(229, 'Note 9 Pro', NULL, 25.00),
(230, 'Note 10S', NULL, 25.00),
(231, 'Note 13 Pro', '4g', 35.00),
(232, 'Note 13', '4g', 30.00),
(233, 'Note 8 Pro', NULL, 25.00),
(234, 'Note 11', '4g', 25.00),
(235, 'Poco M4 Pro', NULL, 25.00),
(236, 'Smart 9', NULL, 30.00),
(237, 'Hot 50i', NULL, 30.00),
(238, 'Hot 50', '5g', 30.00),
(239, 'Smart 7', NULL, 30.00),
(240, 'Smart 8', NULL, 30.00),
(241, 'Smart 6', NULL, 30.00),
(242, 'Hot 40 Pro', NULL, 30.00),
(243, 'Hot 30i', NULL, 30.00),
(244, 'Hot 30', NULL, 30.00),
(245, 'Hot 20i', NULL, 30.00),
(246, 'Hot 11S', NULL, 30.00),
(247, 'Hot 11 Play', NULL, 25.00),
(248, 'Note 50', NULL, 30.00),
(249, 'C67', NULL, 30.00),
(250, 'C63', NULL, 30.00),
(251, 'C61', NULL, 30.00),
(252, 'C55', NULL, 30.00),
(253, 'C53', NULL, 30.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `flex_digital`
--

CREATE TABLE `flex_digital` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `flex_digital`
--

INSERT INTO `flex_digital` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'ONE FUSION', NULL, 25.00),
(2, 'E5 PLAY', NULL, 25.00),
(3, 'G5S PLUS', NULL, 25.00),
(4, 'G8 PLUS', NULL, 25.00),
(5, 'G8', NULL, 25.00),
(6, 'Z POWER', NULL, 25.00),
(7, 'G14', NULL, 25.00),
(8, 'X4', NULL, 25.00),
(9, 'ONE VISION', NULL, 25.00),
(10, 'G7 PLAY', NULL, 25.00),
(11, 'G7 POWER', NULL, 25.00),
(12, 'ONE FUSION PLUS', NULL, 25.00),
(13, 'G8 POWER', NULL, 25.00),
(14, 'G8 POWER LITE', NULL, 25.00),
(15, 'Z2 PLAY', NULL, 25.00),
(16, 'G4 PLUS', NULL, 25.00),
(17, 'G6', NULL, 25.00),
(18, 'G7', NULL, 25.00),
(19, 'G7 PLUS', NULL, 25.00),
(20, 'G5', NULL, 25.00),
(21, 'E20', NULL, 25.00),
(22, 'E6 PLAY', NULL, 25.00),
(23, 'E5', NULL, 25.00),
(24, 'E5 PLUS', NULL, 25.00),
(25, 'G10', NULL, 25.00),
(26, 'G20', NULL, 25.00),
(27, 'G30', NULL, 25.00),
(28, 'G60', NULL, 25.00),
(29, 'G9 PLAY', NULL, 25.00),
(30, 'E7 PLUS', NULL, 25.00),
(31, 'E22', NULL, 25.00),
(32, 'G22', NULL, 25.00),
(33, 'G52', NULL, 25.00),
(34, 'E32', NULL, 25.00),
(35, 'G62', NULL, 25.00),
(36, 'G23', NULL, 25.00),
(37, 'G73', NULL, 25.00),
(38, 'E7 POWER', NULL, 25.00),
(39, 'E7', NULL, 25.00),
(40, 'G9 POWER', NULL, 25.00),
(41, 'iPhone 4', NULL, 10.00),
(42, 'iPhone 5', NULL, 10.00),
(43, 'iPhone 6S', NULL, 10.00),
(44, 'iPhone 6', NULL, 10.00),
(45, 'iPhone 7', NULL, 25.00),
(46, 'iPhone 8', NULL, 25.00),
(47, 'iPhone 7 Plus', NULL, 25.00),
(48, 'iPhone 8 Plus', NULL, 25.00),
(49, 'A10S', NULL, 25.00),
(50, 'A13', NULL, 35.00),
(51, 'A12', NULL, 35.00),
(52, 'A14', NULL, 35.00),
(53, 'M12', NULL, 35.00),
(54, 'A20', NULL, 25.00),
(55, 'A11', NULL, 25.00),
(56, 'A21S', NULL, 25.00),
(57, 'A03S', NULL, 30.00),
(58, 'A15', NULL, 35.00),
(59, 'A23', NULL, 35.00),
(60, 'A22', NULL, 35.00),
(61, 'A30S', NULL, 25.00),
(62, 'A32', '4g', 25.00),
(63, 'A71', NULL, 25.00),
(64, 'A51', NULL, 25.00),
(65, 'J5 PRIME', NULL, 25.00),
(66, 'J7 PRIME', NULL, 25.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `flex_power`
--

CREATE TABLE `flex_power` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `flex_power`
--

INSERT INTO `flex_power` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 4', NULL, 25.00),
(2, 'iPhone 4S', NULL, 25.00),
(3, 'iPhone 5', NULL, 25.00),
(4, 'iPhone 6', NULL, 25.00),
(5, 'iPhone 6 Plus', NULL, 25.00),
(6, 'iPhone 7', NULL, 25.00),
(7, 'iPhone 8', NULL, 25.00),
(8, 'iPhone 7 Plus', NULL, 25.00),
(9, 'iPhone XR', NULL, 25.00),
(10, 'iPhone XS', NULL, 25.00),
(11, 'iPhone 11', NULL, 25.00),
(12, 'iPhone 11 Pro', NULL, 25.00),
(13, 'iPhone 11 Pro Max', NULL, 25.00),
(14, 'iPhone SE', NULL, 25.00),
(15, 'iPhone XS Max', NULL, 25.00),
(16, 'G100', NULL, 10.00),
(17, 'G41', NULL, 10.00),
(18, 'G32', NULL, 10.00),
(19, 'G9 PLAY', NULL, 10.00),
(20, 'E7 PLUS', NULL, 10.00),
(21, 'C PLUS', NULL, 10.00),
(22, 'G5', NULL, 10.00),
(23, 'E7 POWER', NULL, 10.00),
(24, 'MOTO ONE', NULL, 10.00),
(25, 'ONE VISION', NULL, 10.00),
(26, 'G9 POWER', NULL, 10.00),
(27, 'E7', NULL, 10.00),
(28, 'E4', NULL, 10.00),
(29, 'G23', NULL, 10.00),
(30, 'G50', '5g', 10.00),
(31, 'G31', NULL, 10.00),
(32, 'G5S', NULL, 10.00),
(33, 'E20', NULL, 10.00),
(34, 'G6', NULL, 10.00),
(35, 'G8 PLAY', NULL, 10.00),
(36, 'G10', NULL, 10.00),
(37, 'G20', NULL, 10.00),
(38, 'G30', NULL, 10.00),
(39, 'G6 PLAY', NULL, 10.00),
(40, 'E4 PLUS', NULL, 10.00),
(41, 'E7 PLUS', NULL, 10.00),
(42, 'G7 PLUS', NULL, 10.00),
(43, 'E22', NULL, 10.00),
(44, 'G7 PLAY', NULL, 10.00),
(45, 'G8 POWER', NULL, 10.00),
(46, 'EDGE 30 FUSION', NULL, 10.00),
(47, 'G04', NULL, 10.00),
(48, 'G04S', NULL, 10.00),
(49, 'E13', NULL, 10.00),
(50, 'G8 PLUS', NULL, 10.00),
(51, 'G22', NULL, 10.00),
(52, 'E6S', NULL, 10.00),
(53, 'E32', NULL, 10.00),
(54, 'G7', NULL, 10.00),
(55, 'G9 PLUS', NULL, 10.00),
(56, 'E6 PLAY', NULL, 10.00),
(57, 'G4 PLAY', NULL, 10.00),
(58, 'ONE FUSION', NULL, 10.00),
(59, 'G54', NULL, 10.00),
(60, 'EDGE 20 PRO', NULL, 10.00),
(61, 'EDGE 30 NEO', NULL, 10.00),
(62, 'E6 PLUS', NULL, 10.00),
(63, 'G42', NULL, 10.00),
(64, 'A52', NULL, 10.00),
(65, 'A72', NULL, 10.00),
(66, 'S20 FE', NULL, 10.00),
(67, 'A05', NULL, 10.00),
(68, 'M31', NULL, 10.00),
(69, 'A10', NULL, 10.00),
(70, 'A10S', NULL, 10.00),
(71, 'A50', NULL, 10.00),
(72, 'A30S', NULL, 10.00),
(73, 'A15', NULL, 10.00),
(74, 'A520', NULL, 10.00),
(75, 'A32', NULL, 10.00),
(76, 'A02', NULL, 10.00),
(77, 'A70', NULL, 10.00),
(78, 'J7 METAL', NULL, 10.00),
(79, 'A03S', NULL, 10.00),
(80, 'A21S', NULL, 10.00),
(81, 'J5 PRO', NULL, 10.00),
(82, 'J7 PRIME', NULL, 10.00),
(83, 'A20S', NULL, 10.00),
(84, 'A03 CORE', NULL, 10.00),
(85, 'A31', NULL, 10.00),
(86, 'A01', NULL, 10.00),
(87, 'A05S', NULL, 10.00),
(88, 'A11', NULL, 10.00),
(89, 'T225', NULL, 10.00),
(90, 'A02S', NULL, 10.00),
(91, 'A03', NULL, 10.00),
(92, 'A04E', NULL, 10.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `flex_sub`
--

CREATE TABLE `flex_sub` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `flex_sub`
--

INSERT INTO `flex_sub` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'G8 PLUS', 'm', 15.00),
(2, 'G8 PLUS', 'turbo', 15.00),
(3, 'G9 PLAY', NULL, 15.00),
(4, 'G9 PLUS', NULL, 15.00),
(5, 'G9 POWER', NULL, 15.00),
(6, 'G8 PLAY', 'm', 15.00),
(7, 'G8 POWER', NULL, 15.00),
(8, 'G8 PLAY', NULL, 15.00),
(9, 'ONE MACRO', NULL, 15.00),
(10, 'G7 POWER', NULL, 15.00),
(11, 'G7 PLAY', NULL, 15.00),
(12, 'G42', NULL, 15.00),
(13, 'G31', 'lcd', 15.00),
(14, 'G84', NULL, 15.00),
(15, 'G200', NULL, 15.00),
(16, 'G14', NULL, 15.00),
(17, 'G41', NULL, 15.00),
(18, 'G60', NULL, 15.00),
(19, 'G32', NULL, 15.00),
(20, 'E5 PLAY', NULL, 15.00),
(21, 'G5', NULL, 15.00),
(22, 'G4 PLAY', NULL, 15.00),
(23, 'G8', NULL, 15.00),
(24, 'EDGE 30', NULL, 30.00),
(25, 'E4', NULL, 15.00),
(26, 'E4 PLUS', NULL, 15.00),
(27, 'E5 PLUS', NULL, 15.00),
(28, 'EDGE 20', NULL, 30.00),
(29, 'MOTO ONE', NULL, 15.00),
(30, 'ONE FUSION', NULL, 15.00),
(31, 'ONE FUSION PLUS', NULL, 15.00),
(32, 'ONE VISION', NULL, 15.00),
(33, 'A30', 'c/c', 15.00),
(34, 'A32', NULL, 15.00),
(35, 'A22', NULL, 15.00),
(36, 'A33', NULL, 15.00),
(37, 'A35', NULL, 15.00),
(38, 'A55', NULL, 15.00),
(39, 'A50', 'lcd', 15.00),
(40, 'A51', NULL, 15.00),
(41, 'A50', 'c/c', 15.00),
(42, 'A15', NULL, 15.00),
(43, 'A10S', 'm15', 15.00),
(44, 'A10S', 'm16', 15.00),
(45, 'A10', NULL, 15.00),
(46, 'M10', NULL, 15.00),
(47, '16', NULL, 15.00),
(48, 'M20', NULL, 15.00),
(49, 'A34', NULL, 15.00),
(50, 'A54', NULL, 15.00),
(51, 'A53', NULL, 15.00),
(52, 'A30S', 'lcd', 15.00),
(53, 'A52', NULL, 15.00),
(54, 'A31', NULL, 15.00),
(55, 'A72', NULL, 15.00),
(56, 'A73', NULL, 15.00),
(57, 'A71', NULL, 15.00),
(58, 'A80', NULL, 15.00),
(59, 'A70', NULL, 15.00),
(60, 'M62', NULL, 15.00),
(61, 'M51', NULL, 15.00),
(62, 'M52', NULL, 15.00),
(63, 'M53', NULL, 15.00),
(64, 'M31', NULL, 15.00),
(65, 'M30S', NULL, 15.00),
(66, 'M21S', 'lcd', 15.00),
(67, 'M32', NULL, 15.00),
(68, 'M30', 'c/c', 15.00),
(69, 'S24FE', NULL, 15.00),
(70, 'S20', NULL, 15.00),
(71, 'S22 PLUS', NULL, 15.00),
(72, 'S20 PLUS', NULL, 15.00),
(73, 'S22', NULL, 15.00),
(74, 'NOTE 20 ULTRA', 'lcd', 15.00),
(75, 'NOTE 20 ULTRA', 'c/c', 15.00),
(76, 'S21FE', 'c/c', 15.00),
(77, 'S21FE', 'lcd', 15.00),
(78, 'S20FE', NULL, 15.00),
(79, 'A21S', NULL, 15.00),
(80, 'A25', NULL, 15.00),
(81, 'A20S', 'm15', 15.00),
(82, 'A20S', 'm12', 15.00),
(83, 'A22', '5g', 15.00),
(84, 'A24', NULL, 15.00),
(85, 'A20', 'c/c', 15.00),
(86, 'A20', 'lcd', 15.00),
(87, 'Mi 11T Pro', NULL, 15.00),
(88, 'Mi 8A', NULL, 15.00),
(89, 'Mi A3', 'c/c', 15.00),
(90, 'Redmi 9', NULL, 15.00),
(91, 'Mi 11 Lite', 'lcd', 15.00),
(92, 'Mi 8 Lite', 'c/c', 15.00),
(93, 'Note 10', '4g lcd', 15.00),
(94, 'Mi 9 Lite', 'lcd', 15.00),
(95, 'Mi 9 Lite', 'c/c', 15.00),
(96, 'Mi 9T', NULL, 15.00),
(97, 'Mi 9T Pro', 'lcd', 15.00),
(98, 'Note 7', NULL, 15.00),
(99, 'Poco X3', NULL, 15.00),
(100, 'Poco X3 Pro', NULL, 15.00),
(101, 'Poco F5 Pro', NULL, 15.00),
(102, 'Poco X6 Pro', NULL, 15.00),
(103, 'Poco X5', NULL, 15.00),
(104, 'Poco X5 Pro', NULL, 15.00),
(105, 'M4 Pro', '5g', 15.00),
(106, 'A3', 'lcd', 15.00),
(107, 'Note 8', NULL, 15.00),
(108, 'Note 10', '4g', 15.00),
(109, 'Note 9S', NULL, 15.00),
(110, 'Note 9 Pro', NULL, 15.00),
(111, 'Note 8 Pro', NULL, 15.00),
(112, 'Note 11', NULL, 15.00),
(113, 'Note 11S', NULL, 15.00),
(114, 'Note 9T', 'c/c', 15.00),
(115, 'Note 9', NULL, 15.00),
(116, 'Note 11 Pro', '4g', 15.00),
(117, 'Note 11 Pro', '5g', 15.00),
(118, 'Note 12', NULL, 15.00),
(119, 'Poco X4 Pro', 'lcd', 15.00),
(120, 'Note 13', '4g', 15.00),
(121, 'Note 10 Pro', NULL, 15.00),
(122, 'C55', NULL, 15.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `gaveta`
--

CREATE TABLE `gaveta` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `gaveta`
--

INSERT INTO `gaveta` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 7', NULL, 10.00),
(2, 'iPhone 7 Plus', NULL, 10.00),
(3, 'iPhone 12', NULL, 20.00),
(4, 'iPhone X', NULL, 10.00),
(5, 'iPhone 6', NULL, 10.00),
(6, 'iPhone 8', NULL, 10.00),
(7, 'iPhone 11', NULL, 15.00),
(8, 'iPhone XS Max', NULL, 15.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupos_pedidos`
--

CREATE TABLE `grupos_pedidos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `grupo_jid` varchar(50) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `grupos_pedidos`
--

INSERT INTO `grupos_pedidos` (`id`, `cliente_id`, `grupo_jid`, `criado_em`) VALUES
(1, 2, '120363422100894000@g.us', '2025-09-18 13:44:55'),
(4, 3, '120363403402225180@g.us', '2025-09-18 16:23:37'),
(5, 7, '120363402532532258@g.us', '2025-09-21 15:16:08');

-- --------------------------------------------------------

--
-- Estrutura para tabela `lente_camera`
--

CREATE TABLE `lente_camera` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `lente_camera`
--

INSERT INTO `lente_camera` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 6 Plus', NULL, 0.00),
(2, 'iPhone 6S Plus', NULL, 5.00),
(3, 'iPhone 7', NULL, 5.00),
(4, 'iPhone 8', NULL, 5.00),
(5, 'iPhone 8 Plus', NULL, 5.00),
(6, 'iPhone X', NULL, 5.00),
(7, 'iPhone XS', NULL, 5.00),
(8, 'iPhone XR', NULL, 5.00),
(9, 'iPhone 11', NULL, 5.00),
(10, 'iPhone 11 Pro', NULL, 5.00),
(11, 'iPhone 12', NULL, 5.00),
(12, 'iPhone 12 Pro', NULL, 5.00),
(13, 'iPhone 13', NULL, 5.00),
(14, 'iPhone 13 Pro', NULL, 5.00),
(15, 'iPhone 13 Pro Max', NULL, 5.00),
(16, 'iPhone 12 Pro Max', NULL, 5.00),
(17, 'iPhone 14', NULL, 5.00),
(18, 'ONE ACTION', NULL, 8.00),
(19, 'E32', NULL, 8.00),
(20, 'EDGE 30', NULL, 8.00),
(21, 'ONE HYPER', NULL, 8.00),
(22, 'E22', NULL, 8.00),
(23, 'E5 PLUS', NULL, 8.00),
(24, 'E6 PLAY', NULL, 8.00),
(25, 'E6S', NULL, 8.00),
(26, 'MOTO ONE', NULL, 8.00),
(27, 'E4 PLUS', NULL, 8.00),
(28, 'E6 PLUS', NULL, 8.00),
(29, 'ONE VISION', NULL, 8.00),
(30, 'E7 PLUS', NULL, 8.00),
(31, 'E4', NULL, 8.00),
(32, 'E6I', NULL, 8.00),
(33, 'E7', NULL, 8.00),
(34, 'E7 POWER', NULL, 8.00),
(35, 'ONE FUSION', NULL, 8.00),
(36, 'EDGE 30 FUSION', NULL, 8.00),
(37, 'G7 PLAY', NULL, 8.00),
(38, 'G4', NULL, 8.00),
(39, 'G52', NULL, 8.00),
(40, 'G8 PLUS', NULL, 8.00),
(41, 'G8 POWER', NULL, 8.00),
(42, 'G4 PLUS', NULL, 8.00),
(43, 'Z3 PLAY', NULL, 8.00),
(44, 'G5S', NULL, 8.00),
(45, 'G54', NULL, 8.00),
(46, 'G7 PLUS', NULL, 8.00),
(47, 'G24', NULL, 8.00),
(48, 'G5 PLUS', NULL, 8.00),
(49, 'G10', NULL, 8.00),
(50, 'G34', NULL, 8.00),
(51, 'G7 POWER', NULL, 8.00),
(52, 'G8 PLAY', NULL, 8.00),
(53, 'X4', NULL, 8.00),
(54, 'G6 PLAY', NULL, 8.00),
(55, 'G5G', NULL, 8.00),
(56, 'G7', NULL, 8.00),
(57, 'G8 POWER LITE', NULL, 8.00),
(58, 'G42', NULL, 8.00),
(59, 'G22', NULL, 8.00),
(60, 'G5G PLUS', NULL, 8.00),
(61, 'G32', NULL, 8.00),
(62, 'G6 PLUS', NULL, 8.00),
(63, 'ZPLAY', NULL, 8.00),
(64, 'G6', NULL, 8.00),
(65, 'G84', NULL, 8.00),
(66, 'EDGE 40', NULL, 8.00),
(67, 'G35', NULL, 8.00),
(68, 'G53', NULL, 8.00),
(69, 'G9 PLAY', NULL, 8.00),
(70, 'G5', NULL, 8.00),
(71, 'G9 PLUS', NULL, 8.00),
(72, 'J510', NULL, 8.00),
(73, 'J7 PRIME', NULL, 8.00),
(74, 'J4 PLUS', NULL, 8.00),
(75, 'J4', NULL, 8.00),
(76, 'J2 CORE', NULL, 8.00),
(77, 'J2 PRO', NULL, 8.00),
(78, 'NOTE 20 PLUS', NULL, 8.00),
(79, 'S20 PLUS', NULL, 8.00),
(80, 'S6', NULL, 8.00),
(81, 'S9 PLUS', NULL, 8.00),
(82, 'S10', NULL, 8.00),
(83, 'S10 PLUS', NULL, 8.00),
(84, 'S21 PLUS', NULL, 8.00),
(85, 'S20 FE', NULL, 8.00),
(86, 'S20', NULL, 8.00),
(87, 'S22 PLUS', NULL, 8.00),
(88, 'A50', NULL, 8.00),
(89, 'A51', NULL, 8.00),
(90, 'A54', NULL, 8.00),
(91, 'A55', NULL, 8.00),
(92, 'A80', NULL, 8.00),
(93, 'M54', NULL, 8.00),
(94, 'M12', NULL, 8.00),
(95, 'M34', NULL, 8.00),
(96, 'M51', NULL, 8.00),
(97, 'M53', NULL, 8.00),
(98, 'A23', '4g', 8.00),
(99, 'A22', '4g', 8.00),
(100, 'A31', NULL, 8.00),
(101, 'A21S', NULL, 8.00),
(102, 'A20S', NULL, 8.00),
(103, 'A23', '5g', 8.00),
(104, 'A24', NULL, 8.00),
(105, 'A25', NULL, 8.00),
(106, 'A30S', NULL, 8.00),
(107, 'A10', NULL, 8.00),
(108, 'A20', NULL, 8.00),
(109, 'A30', NULL, 8.00),
(110, 'A03 CORE', NULL, 8.00),
(111, 'A14', NULL, 8.00),
(112, 'A11', NULL, 8.00),
(113, 'A15', NULL, 8.00),
(114, 'A01', NULL, 8.00),
(115, 'A02', NULL, 8.00),
(116, 'A13', NULL, 8.00),
(117, 'A8 PLUS', NULL, 8.00),
(118, 'A12', NULL, 8.00),
(119, 'A6 PLUS', NULL, 8.00),
(120, 'A02S', NULL, 8.00),
(121, 'A03S', NULL, 8.00),
(122, 'Note 11', '5g', 8.00),
(123, 'Note 11 Pro', NULL, 8.00),
(124, 'Note 12', NULL, 8.00),
(125, 'Note 13 Pro', '4g', 8.00),
(126, 'Note 13', '4g', 8.00),
(127, 'Poco X6', NULL, 8.00),
(128, 'Poco X4 Pro', NULL, 8.00),
(129, 'Poco F1', NULL, 8.00),
(130, 'Redmi 9T', NULL, 8.00),
(131, 'Redmi 6A', NULL, 8.00),
(132, 'Redmi 7A', NULL, 8.00),
(133, 'Redmi 8A', NULL, 8.00),
(134, 'A2 Lite', NULL, 8.00),
(135, 'Mi A2', NULL, 8.00),
(136, 'Mi A3', NULL, 8.00),
(137, 'Mi 9', NULL, 8.00),
(138, 'Mi 9 Lite', NULL, 8.00),
(139, '5 Plus', NULL, 8.00),
(140, 'Redmi 8', NULL, 8.00),
(141, 'Redmi 9', NULL, 8.00),
(142, 'Redmi 10', NULL, 8.00),
(143, 'Redmi 10 Lite', NULL, 8.00),
(144, 'Redmi 10T', NULL, 8.00),
(145, 'Redmi 12C', NULL, 8.00),
(146, 'Redmi 13C', NULL, 8.00),
(147, 'Note 7', NULL, 8.00),
(148, 'Note 8', NULL, 8.00),
(149, 'Note 8T', NULL, 8.00),
(150, 'Note 8 Pro', NULL, 8.00),
(151, 'Note 9S', NULL, 8.00),
(152, 'Note 9', NULL, 8.00),
(153, 'Note 9 Pro', NULL, 8.00),
(154, 'Note 9T', NULL, 8.00),
(155, 'Poco X6 Pro', NULL, 8.00),
(156, 'Poco X3', NULL, 8.00),
(157, 'Poco X3 Pro', NULL, 8.00),
(158, 'Note 10', '4g', 8.00),
(159, 'Note 10', '5g', 8.00),
(160, 'C55', NULL, 10.00),
(161, 'C35', NULL, 10.00),
(162, 'C53', NULL, 10.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `microfone`
--

CREATE TABLE `microfone` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `microfone`
--

INSERT INTO `microfone` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'J8', NULL, 10.00),
(2, 'J6', NULL, 10.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `cliente_nome` varchar(100) NOT NULL,
  `cliente_numero` varchar(30) NOT NULL,
  `data_pedido` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `cliente_nome`, `cliente_numero`, `data_pedido`) VALUES
(3, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-16 14:01:43'),
(4, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-16 14:04:51'),
(5, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-16 14:12:53'),
(6, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-16 14:15:23'),
(7, 'Jão Luska', '5512981895318@s.whatsapp.net', '2025-09-16 14:26:45'),
(8, 'Jão Luska', '5512981895318@s.whatsapp.net', '2025-09-16 18:21:31'),
(9, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-16 20:31:12'),
(10, 'João Lucas', '5512981895318@s.whatsapp.net', '2025-09-17 08:42:00'),
(12, 'aleky', '5512991235862@s.whatsapp.net', '2025-09-17 10:28:54'),
(13, 'aleky', '5512991235862@s.whatsapp.net', '2025-09-17 11:35:46'),
(14, 'aleky', '5512991235862@s.whatsapp.net', '2025-09-17 11:56:01'),
(15, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-17 13:54:46'),
(16, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-17 13:59:02'),
(17, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-17 14:00:38'),
(18, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-17 14:03:36'),
(19, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-17 14:15:05'),
(20, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-17 14:20:05'),
(21, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 14:30:10'),
(22, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-17 14:32:08'),
(23, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-17 15:32:42'),
(24, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-17 16:58:20'),
(25, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:00:11'),
(26, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:00:11'),
(27, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:00:26'),
(28, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:00:26'),
(29, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:01:15'),
(30, 'Pedro Paulo', '5512992568744@s.whatsapp.net', '2025-09-17 17:01:15'),
(31, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 10:46:39'),
(32, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 10:58:01'),
(33, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 10:58:39'),
(34, 'João Lucas', '5512981895318@s.whatsapp.net', '2025-09-18 11:05:41'),
(35, 'João Lucas', '5512981895318@s.whatsapp.net', '2025-09-18 11:13:02'),
(36, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 13:22:27'),
(37, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 13:26:02'),
(38, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 13:28:31'),
(39, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 13:56:11'),
(40, 'João Lucas', '5512981895318@s.whatsapp.net', '2025-09-18 16:42:07'),
(41, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 16:49:48'),
(42, 'Loja V10', '5512981964272@s.whatsapp.net', '2025-09-18 16:53:23'),
(43, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-18 22:28:20'),
(44, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-18 23:03:13'),
(45, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-18 23:05:02'),
(46, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-18 23:05:40'),
(47, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-18 23:17:38'),
(48, 'João Lucas', '5512981895318@s.whatsapp.net', '2025-09-19 17:37:38'),
(49, 'Daniel Godoy', '5512997377620@s.whatsapp.net', '2025-09-21 12:19:54');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido_itens`
--

CREATE TABLE `pedido_itens` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `qualidade` varchar(50) DEFAULT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `preco` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedido_itens`
--

INSERT INTO `pedido_itens` (`id`, `pedido_id`, `tipo`, `modelo`, `qualidade`, `quantidade`, `preco`) VALUES
(3, 3, 'tela', 'G10', 'sem aro', 1, 120.00),
(4, 4, 'tela', 'G10', 'sem aro', 5, 130.00),
(5, 4, 'conector', 'G10', NULL, 3, 10.00),
(6, 4, 'lente_camera', 'G54', NULL, 1, 10.00),
(7, 5, 'tela', 'G10', 'sem aro', 1, 120.00),
(8, 6, 'tela', 'G10', 'sem aro', 1, 120.00),
(9, 7, 'tela', 'G10', 'sem aro', 1, 120.00),
(10, 8, 'tela', 'G10', 'sem aro', 3, 120.00),
(11, 9, 'tela', 'G10', 'sem aro', 1, 120.00),
(12, 10, 'tela', 'E20', 'sem aro', 1, 70.00),
(14, 12, 'tela', 'G10', 'nacional', 1, 130.00),
(15, 12, 'bateria', 'IPHONE 12', NULL, 1, 120.00),
(16, 12, 'tela', 'G10', 'sem aro', 1, 120.00),
(17, 12, 'tela', 'E13', 'com aro', 1, 160.00),
(18, 12, 'bateria', 'IPHONE 6', NULL, 1, 60.00),
(19, 13, 'tela', 'G10', 'com aro', 1, 90.00),
(20, 13, 'bateria', 'IPHONE 12', NULL, 1, 120.00),
(21, 14, 'tela', 'G10', 'nacional', 10, 130.00),
(22, 15, 'bateria', 'A02S', NULL, 6, 360.00),
(23, 16, 'tela', 'G10', 'nacional', 1, 130.00),
(24, 17, 'tela', 'E22', 'sem aro', 1, 80.00),
(25, 18, 'tela', 'E20', 'sem aro', 1, 70.00),
(26, 19, 'tela', 'E20', 'sem aro', 1, 70.00),
(27, 20, 'tela', 'G10', 'com aro', 2, 90.00),
(28, 20, 'tela', 'G10', 'nacional', 2, 130.00),
(29, 20, 'tela', 'G10', 'sem aro', 2, 120.00),
(30, 21, 'bateria', 'A03 CORE', NULL, 5, 300.00),
(31, 21, 'lente_camera', 'E22', NULL, 1, 10.00),
(32, 22, 'tela', 'G10', 'sem aro', 1, 120.00),
(40, 24, 'tela', 'G10', 'sem aro', 1, 120.00),
(41, 24, 'tela', 'E5 PLAY', 'sem aro', 1, 90.00),
(42, 25, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(43, 25, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(44, 26, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(45, 26, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(46, 27, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(47, 27, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(48, 28, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(49, 28, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(50, 29, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(51, 29, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(52, 30, 'tela', 'E4 PLUS', 'sem aro', 1, 70.00),
(53, 30, 'lente_camera', 'E5 PLUS', NULL, 1, 10.00),
(54, 23, 'tela', 'E13', 'sem aro', 1, 90.00),
(55, 31, 'tela', 'G10', 'sem aro', 1, 120.00),
(56, 32, 'tela', 'G10', 'sem aro', 1, 120.00),
(57, 33, 'tela', 'G10', 'nacional', 1, 130.00),
(58, 34, 'tela', 'G10', 'sem aro', 1, 120.00),
(59, 35, 'tela', 'G10', 'sem aro', 1, 120.00),
(60, 35, 'flex_power', 'E7 POWER', NULL, 1, 10.00),
(61, 36, 'tela', 'G10', 'nacional', 1, 130.00),
(62, 36, 'bateria', 'IPHONE 6', NULL, 1, 60.00),
(63, 37, 'tela', 'G10', 'sem aro', 1, 120.00),
(64, 38, 'tela', 'G10', 'sem aro', 1, 120.00),
(65, 39, 'conector', 'G10', NULL, 1, 10.00),
(66, 39, 'tela', 'G10', 'sem aro', 2, 120.00),
(67, 39, 'conector', 'ONE ACTION', NULL, 1, 10.00),
(68, 39, 'bateria', 'IPHONE 12', NULL, 2, 120.00),
(69, 40, 'tela', 'G10', 'sem aro', 1, 120.00),
(70, 41, 'tela', 'G10', 'sem aro', 1, 120.00),
(71, 42, 'tela', 'G10', 'sem aro', 1, 120.00),
(72, 42, 'flex_power', 'G10', NULL, 1, 10.00),
(73, 42, 'tela', 'g10 power', 'nacional', 1, 100.00),
(74, 43, 'tela', 'Motorola g10', 'c/aro', 1, 85.00),
(75, 43, 'conector', 'G10', NULL, 1, 40.00),
(76, 44, 'tela', 'g10', 'na c/aro', 1, 130.00),
(77, 44, 'bateria', 'S23', NULL, 1, 60.00),
(78, 44, 'conector', 'G10', NULL, 1, 40.00),
(79, 45, 'tela', 'g10', 's/aro', 1, 65.00),
(80, 46, 'tela', 'g22', 's/aro', 1, 75.00),
(81, 47, 'wifi', 'iPhone 7', NULL, 1, 25.00),
(82, 47, 'tampa', 'E4', NULL, 1, 25.00),
(83, 47, 'alto_falante', 'E22', NULL, 1, 15.00),
(84, 47, 'auricular', 'iPhone 13 Pro', NULL, 1, 55.00),
(85, 47, 'bateria', 'A20', NULL, 1, 60.00),
(86, 47, 'conector', 'iPhone 6S', NULL, 1, 25.00),
(87, 47, 'flex_digital', 'ONE VISION', NULL, 1, 25.00),
(88, 47, 'flex_power', 'G8 POWER', NULL, 1, 10.00),
(89, 47, 'flex_sub', 'ONE MACRO', NULL, 1, 15.00),
(90, 47, 'lente_camera', 'iPhone 11', NULL, 1, 5.00),
(91, 47, 'microfone', 'J8', NULL, 1, 10.00),
(92, 47, 'tampa', 'G6', NULL, 1, 25.00),
(93, 47, 'tela', 'a04e', 'ori s/aro', 1, 80.00),
(94, 48, 'tela', 'note 11', 'incell', 1, 100.00),
(95, 49, 'alto_falante', 'E22', NULL, 1, 15.00),
(96, 49, 'auricular', 'iPhone 12', NULL, 1, 60.00),
(97, 49, 'bateria', 'A10', NULL, 1, 60.00),
(98, 49, 'bateria', 'A14', NULL, 1, 60.00),
(99, 49, 'camera_frontal', 'iPhone 5', NULL, 1, 20.00),
(100, 49, 'camera_traseira', 'J8', NULL, 1, 25.00),
(101, 49, 'conector', 'iPhone X', NULL, 2, 40.00),
(102, 49, 'flex_digital', 'G14', NULL, 4, 25.00),
(103, 49, 'flex_power', 'G41', NULL, 1, 10.00),
(104, 49, 'flex_power', 'G5', NULL, 1, 10.00),
(105, 49, 'flex_sub', 'G8', NULL, 1, 15.00),
(106, 49, 'gaveta', 'iPhone 11', NULL, 1, 15.00),
(107, 49, 'lente_camera', 'EDGE 30', NULL, 1, 8.00),
(108, 49, 'microfone', 'J6', NULL, 1, 10.00),
(109, 49, 'tampa', 'G7 PLAY', NULL, 1, 15.00),
(110, 49, 'tela', 'a03 core', 'c/aro', 1, 85.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tampa`
--

CREATE TABLE `tampa` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tampa`
--

INSERT INTO `tampa` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'E4', NULL, 25.00),
(2, 'E4 PLUS', NULL, 25.00),
(3, 'E5 PLAY', NULL, 20.00),
(4, 'E5', NULL, 15.00),
(5, 'G6 PLAY', NULL, 15.00),
(6, 'E6S', NULL, 30.00),
(7, 'E6 PLUS', NULL, 25.00),
(8, 'E6 PLAY', NULL, 25.00),
(9, 'E7', NULL, 25.00),
(10, 'E7 POWER', NULL, 25.00),
(11, 'E7 PLUS', NULL, 25.00),
(12, 'E20', NULL, 30.00),
(13, 'E22', NULL, 25.00),
(14, 'E32', NULL, 25.00),
(15, 'E13', NULL, 25.00),
(16, 'E40', NULL, 25.00),
(17, 'G6', NULL, 25.00),
(18, 'G7', NULL, 25.00),
(19, 'G7 PLAY', NULL, 15.00),
(20, 'ONE VISION', NULL, 35.00),
(21, 'G8 PLAY', NULL, 15.00),
(22, 'G9 PLUS', NULL, 25.00),
(23, 'G52', NULL, 25.00),
(24, 'G10', NULL, 30.00),
(25, 'G60', NULL, 30.00),
(26, 'G60S', NULL, 30.00),
(27, 'G82', NULL, 25.00),
(28, 'G62', NULL, 25.00),
(29, 'G22', NULL, 25.00),
(30, 'G34', NULL, 25.00),
(31, 'G53', NULL, 25.00),
(32, 'G71', NULL, 25.00),
(33, 'G100', NULL, 35.00),
(34, 'G200', NULL, 40.00),
(35, 'G84', NULL, 25.00),
(36, 'G23', NULL, 25.00),
(37, 'G14', NULL, 25.00),
(38, 'G04', NULL, 25.00),
(39, 'J4 PLUS', NULL, 25.00),
(40, 'J6 PLUS', NULL, 25.00),
(41, 'J5 PRIME', NULL, 35.00),
(42, 'J5 PRO', NULL, 35.00),
(43, 'J7 PRIME', NULL, 35.00),
(44, 'J8', NULL, 25.00),
(45, 'S22 ULTRA', NULL, 40.00),
(46, 'S10', NULL, 35.00),
(47, 'S10 PLUS', NULL, 35.00),
(48, 'S10E', NULL, 35.00),
(49, 'S8', NULL, 35.00),
(50, 'S9', NULL, 35.00),
(51, 'S20', NULL, 35.00),
(52, 'S20 PLUS', NULL, 35.00),
(53, 'S21 PLUS', NULL, 35.00),
(54, 'S9 PLUS', NULL, 35.00),
(55, 'S8 PLUS', NULL, 35.00),
(56, 'A720', NULL, 25.00),
(57, 'A8 PLUS', NULL, 25.00),
(58, 'A520', NULL, 25.00),
(59, 'A01', NULL, 25.00),
(60, 'A02', NULL, 25.00),
(61, 'A01 CORE', NULL, 25.00),
(62, 'A03 CORE', NULL, 25.00),
(63, 'A03', NULL, 25.00),
(64, 'A04E', NULL, 25.00),
(65, 'A02S', NULL, 25.00),
(66, 'A03S', NULL, 25.00),
(67, 'A05', NULL, 25.00),
(68, 'A05S', NULL, 25.00),
(69, 'A10', NULL, 25.00),
(70, 'A11', NULL, 25.00),
(71, 'A12', NULL, 25.00),
(72, 'A13', NULL, 25.00),
(73, 'A15', NULL, 25.00),
(74, 'A23', NULL, 25.00),
(75, 'A20', NULL, 20.00),
(76, 'A20S', NULL, 20.00),
(77, 'A21S', NULL, 20.00),
(78, 'A22', '4g', 25.00),
(79, 'M10', NULL, 25.00),
(80, 'M20', NULL, 25.00),
(81, 'M31', NULL, 35.00),
(82, 'A750', NULL, 25.00),
(83, 'A30', NULL, 20.00),
(84, 'A30S', NULL, 20.00),
(85, 'A31', NULL, 20.00),
(86, 'A32', NULL, 25.00),
(87, 'A50', NULL, 20.00),
(88, 'A51', NULL, 25.00),
(89, 'A52', NULL, 25.00),
(90, 'A70', NULL, 20.00),
(91, 'A71', NULL, 20.00),
(92, 'A72', NULL, 25.00),
(93, 'A54', NULL, 25.00),
(94, 'A55', NULL, 25.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `telas`
--

CREATE TABLE `telas` (
  `id` int(11) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `qualidade` varchar(100) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `telas`
--

INSERT INTO `telas` (`id`, `marca`, `nome`, `qualidade`, `preco`) VALUES
(1, 'Samsung', 'a01 core', 's/aro', 70.00),
(2, 'Samsung', 'a01 core', 'c/aro', 90.00),
(3, 'Samsung', 'a01', 's/aro', 60.00),
(4, 'Samsung', 'a01', 'nacional completo', 135.00),
(5, 'Samsung', 'a02', 'pa s/aro', 65.00),
(6, 'Samsung', 'a02', 'ori s/aro', 85.00),
(7, 'Samsung', 'a02', 'c/aro', 100.00),
(8, 'Samsung', 'a02s', 'ori s/aro', 80.00),
(9, 'Samsung', 'a02s', 'c/aro retirado', 140.00),
(10, 'Samsung', 'a03 core', 'na s/aro', 80.00),
(11, 'Samsung', 'a03 core', 'c/aro', 85.00),
(12, 'Samsung', 'a03s', 'ori s/aro', 80.00),
(13, 'Samsung', 'a03s', 'c/aro', 100.00),
(14, 'Samsung', 'a03s', 'c/aro completo', 160.00),
(15, 'Samsung', 'a04e', 'ori s/aro', 80.00),
(16, 'Samsung', 'a04e', 'c/aro boa', 110.00),
(17, 'Samsung', 'a04s', 'pa s/aro', 70.00),
(18, 'Samsung', 'a04s', 'boa s/aro', 90.00),
(19, 'Samsung', 'a04s', 'na s/aro', 120.00),
(20, 'Samsung', 'a05', 'pa s/aro', 75.00),
(21, 'Samsung', 'a05', 'ori s/aro', 85.00),
(22, 'Samsung', 'a05', 'ori c/aro', 100.00),
(23, 'Samsung', 'a05', 'na s/aro', 100.00),
(24, 'Samsung', 'a05s', 'ori s/aro', 90.00),
(25, 'Samsung', 'a05s', 'na s/aro', 110.00),
(26, 'Samsung', 'a05s', 'ori c/aro', 100.00),
(27, 'Samsung', 'a06 4g', 'ori s/aro', 85.00),
(28, 'Samsung', 'a06 4g', 'na s/aro', 100.00),
(29, 'Samsung', 'a06 4g', 'boa s/aro', 100.00),
(30, 'Samsung', 'a06 4g', 'na c/aro', 130.00),
(31, 'Samsung', 'a06 5g', 'ori s/aro', 90.00),
(32, 'Samsung', 'a06 5g', 'c/aro', 100.00),
(33, 'Samsung', 'a10', 'pa s/aro', 65.00),
(34, 'Samsung', 'a10', 'c/aro', 85.00),
(35, 'Samsung', 'a10s', 'pa s/aro', 65.00),
(36, 'Samsung', 'a10s', 'c/aro', 85.00),
(37, 'Samsung', 'a10s', 'na c/aro', 120.00),
(38, 'Samsung', 'a11', 'pa s/aro', 75.00),
(39, 'Samsung', 'a11', 's/aro boa', 85.00),
(40, 'Samsung', 'a11', 'c/aro retirado', 140.00),
(41, 'Samsung', 'a12', 'pa s/aro', 65.00),
(42, 'Samsung', 'a12', 's/aro boa', 85.00),
(43, 'Samsung', 'a12', 'c/aro', 100.00),
(44, 'Samsung', 'a13', 'pa s/aro', 75.00),
(45, 'Samsung', 'a13', 'c/aro', 85.00),
(46, 'Samsung', 'a14', 'ori s/aro', 85.00),
(47, 'Samsung', 'a14', 'na s/aro', 100.00),
(48, 'Samsung', 'a14', 'c/aro boa', 115.00),
(49, 'Samsung', 'a15', 'pa c/aro', 100.00),
(50, 'Samsung', 'a15', 'oled c/aro', 185.00),
(51, 'Samsung', 'a15', 'ole c/aro', 215.00),
(52, 'Samsung', 'a15', 'na c/aro', 410.00),
(53, 'Samsung', 'a16 4g', 'incell c/aro', 120.00),
(54, 'Samsung', 'a16 4g', 'na c/aro', 400.00),
(55, 'Samsung', 'a16 5g', 'incell c/aro', 120.00),
(56, 'Samsung', 'a16 5g', 'na c/aro', 400.00),
(57, 'Samsung', 'a20', 'hd incell c/aro', 90.00),
(58, 'Samsung', 'a20', 'oled c/aro', 155.00),
(59, 'Samsung', 'a20', 'na s/aro', 200.00),
(60, 'Samsung', 'a20', 'na c/aro', 300.00),
(61, 'Samsung', 'a20s', 'ori s/aro', 80.00),
(62, 'Samsung', 'a20s', 'c/aro ori', 110.00),
(63, 'Samsung', 'a21s', 's/aro', 70.00),
(64, 'Samsung', 'a21s', 'c/aro', 85.00),
(65, 'Samsung', 'a22', 'incell c/aro', 90.00),
(66, 'Samsung', 'a22', 'oled c/aro', 155.00),
(67, 'Samsung', 'a22', 'na c/aro', 400.00),
(68, 'Samsung', 'a22 5g', 's/aro', 90.00),
(69, 'Samsung', 'a22 5g', 'na s/aro', 120.00),
(70, 'Samsung', 'a22 5g', 'na c/aro', 130.00),
(71, 'Samsung', 'a23 4g', 's/aro boa', 75.00),
(72, 'Samsung', 'a23 4g', 'c/aro', 100.00),
(73, 'Samsung', 'a23 5g', 's/aro boa', 90.00),
(74, 'Samsung', 'a24', 'c/aro pa', 90.00),
(75, 'Samsung', 'a24', 'oled panda c/aro', 180.00),
(76, 'Samsung', 'a24', 'oled c/aro', 220.00),
(77, 'Samsung', 'a24', 'na c/aro', 400.00),
(78, 'Samsung', 'a25', 'c/aro pa', 90.00),
(79, 'Samsung', 'a25', 'oled c/aro', 220.00),
(80, 'Samsung', 'a25', 'na c/aro', 450.00),
(81, 'Samsung', 'a26', 'na c/aro', 450.00),
(82, 'Samsung', 'a30', 'hd incell c/aro', 100.00),
(83, 'Samsung', 'a30', 'hd c/aro', 90.00),
(84, 'Samsung', 'a30', 'na c/aro', 400.00),
(85, 'Samsung', 'a30s', 'hd incell c/aro', 100.00),
(86, 'Samsung', 'a30s', 'hd c/aro', 90.00),
(87, 'Samsung', 'a30s', 'oled c/aro', 155.00),
(88, 'Samsung', 'a30s', 'na c/aro', 400.00),
(89, 'Samsung', 'a31', 'hd incell c/aro', 105.00),
(90, 'Samsung', 'a31', 'hd c/aro', 90.00),
(91, 'Samsung', 'a31', 'oled c/aro', 155.00),
(92, 'Samsung', 'a31', 'na c/aro', 450.00),
(93, 'Samsung', 'a32 4g', 'hd c/aro', 90.00),
(94, 'Samsung', 'a32 4g', 'oled c/aro', 170.00),
(95, 'Samsung', 'a32 4g', 'na c/aro', 450.00),
(96, 'Samsung', 'a32 5g', 's/aro', 100.00),
(97, 'Samsung', 'a32 5g', 'na s/aro', 130.00),
(98, 'Samsung', 'a33', 'incell s/aro', 100.00),
(99, 'Samsung', 'a33', 'oled c/aro', 200.00),
(100, 'Samsung', 'a34', 'incell c/aro', 120.00),
(101, 'Samsung', 'a34', 'na c/aro', 570.00),
(102, 'Samsung', 'a35', 'oled c/aro', 260.00),
(103, 'Samsung', 'a35', 'na c/aro', 540.00),
(104, 'Samsung', 'a35', 'na s/aro', 480.00),
(105, 'Samsung', 'a50', 'hd incell c/aro', 100.00),
(106, 'Samsung', 'a50', 'hd c/aro', 90.00),
(107, 'Samsung', 'a50', 'oled c/aro', 155.00),
(108, 'Samsung', 'a51', 'hd c/aro', 90.00),
(109, 'Samsung', 'a51', 'oled menor', 130.00),
(110, 'Samsung', 'a51', 'oled c/aro', 180.00),
(111, 'Samsung', 'a51', 'na c/aro', 480.00),
(112, 'Samsung', 'a510', 'oled', 180.00),
(113, 'Samsung', 'a52', 'incell c/aro', 110.00),
(114, 'Samsung', 'a52', 'oled c/aro', 230.00),
(115, 'Samsung', 'a52', 'na c/aro', 550.00),
(116, 'Samsung', 'a53', 'oled c/aro', 210.00),
(117, 'Samsung', 'a53', 'na c/aro', 580.00),
(118, 'Samsung', 'a530', 'oled', 200.00),
(119, 'Samsung', 'a6 plus', 'oled', 180.00),
(120, 'Samsung', 'a54', 'incell c/aro', 135.00),
(121, 'Samsung', 'a54', 'oled c/aro', 210.00),
(122, 'Samsung', 'a54', 'na c/aro', 550.00),
(123, 'Samsung', 'a55', 'na s/aro', 480.00),
(124, 'Samsung', 'a55', 'na c/aro', 590.00),
(125, 'Samsung', 'a70', 'hd c/aro', 100.00),
(126, 'Samsung', 'a70', 'oled s/aro', 240.00),
(127, 'Samsung', 'a70', 'na c/aro', 580.00),
(128, 'Samsung', 'a71', 'hd c/aro', 110.00),
(129, 'Samsung', 'a71', 'oled mole c/aro', 190.00),
(130, 'Samsung', 'a71', 'na c/aro', 500.00),
(131, 'Samsung', 'a710', 'oled', 200.00),
(132, 'Samsung', 'a72', 'incell c/aro', 110.00),
(133, 'Samsung', 'a72', 'oled c/aro', 265.00),
(134, 'Samsung', 'a72', 'na c/aro', 580.00),
(135, 'Samsung', 'a720', 'incell', 85.00),
(136, 'Samsung', 'a720', 'oled', 200.00),
(137, 'Samsung', 'a720', 'nacional', 250.00),
(138, 'Samsung', 'a73', 'na s/aro', 480.00),
(139, 'Samsung', 'a73', 'na c/aro', 500.00),
(140, 'Samsung', 'a750', 'oled', 190.00),
(141, 'Samsung', 'a750', 'c/aro', 200.00),
(142, 'Samsung', 'a750', 'nacional s/aro', 280.00),
(143, 'Samsung', 'a80', 'na c/aro', 650.00),
(144, 'Samsung', 'j110', 's/aro', 150.00),
(145, 'Samsung', 'j2 core', 's/aro', 65.00),
(146, 'Samsung', 'j4', 'oled', 115.00),
(147, 'Samsung', 'j4', 'nacional', 230.00),
(148, 'Samsung', 'j4 plus', 's/aro', 65.00),
(149, 'Samsung', 'j5', 'oled', 120.00),
(150, 'Samsung', 'j5 pro', 'oled', 120.00),
(151, 'Samsung', 'j5 pro', 'nacional', 140.00),
(152, 'Samsung', 'j5 prime', 's/aro', 65.00),
(153, 'Samsung', 'j5 prime', 'nacional', 110.00),
(154, 'Samsung', 'j6', 's/aro', 40.00),
(155, 'Samsung', 'j6', 'incell', 65.00),
(156, 'Samsung', 'j6', 'oled', 180.00),
(157, 'Samsung', 'j6 plus', 's/aro', 65.00),
(158, 'Samsung', 'j7 metal', 's/aro', 40.00),
(159, 'Samsung', 'j7 metal', 'incell', 80.00),
(160, 'Samsung', 'j7 metal', 'oled', 120.00),
(161, 'Samsung', 'j7 neo', 'oled', 120.00),
(162, 'Samsung', 'j7 neo', 'nacional', 200.00),
(163, 'Samsung', 'j7 prime', 's/aro', 65.00),
(164, 'Samsung', 'j7 prime', 'nacional', 90.00),
(165, 'Samsung', 'j7 prime 2', 's/aro', 65.00),
(166, 'Samsung', 'j7 prime 2', 'nacional', 90.00),
(167, 'Samsung', 'j7 pro', 'oled', 120.00),
(168, 'Samsung', 'j8', 's/aro', 40.00),
(169, 'Samsung', 'j8', 'incell', 65.00),
(170, 'Samsung', 'j8', 'oled', 160.00),
(171, 'Samsung', 'm12', 'pa s/aro', 65.00),
(172, 'Samsung', 'm12', 's/aro boa', 85.00),
(173, 'Samsung', 'm12', 'c/aro', 100.00),
(174, 'Samsung', 'm14', 'na c/aro', 100.00),
(175, 'Samsung', 'm15', 'na c/aro', 380.00),
(176, 'Samsung', 'm20', 's/aro', 85.00),
(177, 'Samsung', 'm20', 'c/aro', 100.00),
(178, 'Samsung', 'm22', 'hd c/aro', 100.00),
(179, 'Samsung', 'm22', 'na c/aro', 380.00),
(180, 'Samsung', 'm23', 's/aro', 75.00),
(181, 'Samsung', 'm23', 'c/aro', 180.00),
(182, 'Samsung', 'm33', 's/aro', 75.00),
(183, 'Samsung', 'm33', 'c/aro', 180.00),
(184, 'Samsung', 'm30', 'oled s/aro', 140.00),
(185, 'Samsung', 'm30', 'oled c/aro', 160.00),
(186, 'Samsung', 'm30', 'na c/aro', 450.00),
(187, 'Samsung', 'm31', 'oled s/aro', 140.00),
(188, 'Samsung', 'm31', 'oled c/aro', 160.00),
(189, 'Samsung', 'm31', 'na c/aro', 450.00),
(190, 'Samsung', 'm21s', 'oled s/aro', 140.00),
(191, 'Samsung', 'm21s', 'oled c/aro', 160.00),
(192, 'Samsung', 'm21s', 'na c/aro', 450.00),
(193, 'Samsung', 'm32', 'hd c/aro', 100.00),
(194, 'Samsung', 'm32', 'oled c/aro', 210.00),
(195, 'Samsung', 'm32', 'na c/aro', 400.00),
(196, 'Samsung', 'm34', 'oled c/aro', 260.00),
(197, 'Samsung', 'm34', 'na c/aro', 480.00),
(198, 'Samsung', 'm35', 'na s/aro', 480.00),
(199, 'Samsung', 'm51', 'incell c/aro', 100.00),
(200, 'Samsung', 'm51', 'na s/aro', 500.00),
(201, 'Samsung', 'm52', 'incell c/aro', 100.00),
(202, 'Samsung', 'm52', 'na c/aro', 500.00),
(203, 'Samsung', 'm53', 'incell c/aro', 100.00),
(204, 'Samsung', 'm53', 'na c/aro', 500.00),
(205, 'Samsung', 'm54', 'oled c/aro', 330.00),
(206, 'Samsung', 'm55', 'oled c/aro', 310.00),
(207, 'Samsung', 'm55', 'na c/aro', 480.00),
(208, 'Samsung', 'm62', 'incell c/aro', 120.00),
(209, 'Samsung', 'm62', 'na c/aro', 600.00),
(210, 'Samsung', 'note 10 plus', 'oled paralelo', 550.00),
(211, 'Samsung', 'note 20', 'na c/aro', 1100.00),
(212, 'Samsung', 'note 20 ultra', 'na c/aro', 1800.00),
(213, 'Samsung', 's10', 'na c/aro', 1000.00),
(214, 'Samsung', 's10 lite', 'c/aro', 900.00),
(215, 'Samsung', 's10 lite', 'na c/aro', 1000.00),
(216, 'Samsung', 's10 plus', 'ori c/aro', 1100.00),
(217, 'Samsung', 's10e', 'na c/aro', 600.00),
(218, 'Samsung', 's20', 'na c/aro', 1400.00),
(219, 'Samsung', 's20 fe', 'oled c/aro', 210.00),
(220, 'Samsung', 's20 fe', 'na c/aro', 540.00),
(221, 'Samsung', 's20 plus', 'na c/aro', 1400.00),
(222, 'Samsung', 's20 ultra', 'na c/aro', 1600.00),
(223, 'Samsung', 's21', 'na c/aro', 1100.00),
(224, 'Samsung', 's21 fe', 'na c/aro', 850.00),
(225, 'Samsung', 's21 plus', 'na c/aro', 1000.00),
(226, 'Samsung', 's21 ultra', 'na c/aro', 1600.00),
(227, 'Samsung', 's22', 'na c/aro', 1000.00),
(228, 'Samsung', 's22 plus', 'na c/aro', 1000.00),
(229, 'Samsung', 's22 ultra', 'na c/aro', 1700.00),
(230, 'Samsung', 's23', 'na c/aro', 1000.00),
(231, 'Samsung', 's23 fe', 'na s/aro', 600.00),
(232, 'Samsung', 's23 plus', 'na c/aro', 1100.00),
(233, 'Samsung', 's23 ultra', 'na c/aro re', 1500.00),
(234, 'Samsung', 's6', 's/aro', 200.00),
(235, 'Samsung', 's7 edge', 's/aro', 500.00),
(236, 'Samsung', 's8', 'c/aro', 650.00),
(237, 'Samsung', 's8 plus', 'c/aro', 700.00),
(238, 'Samsung', 's9', 'c/aro', 600.00),
(239, 'Samsung', 's9 plus', 'c/aro', 700.00),
(319, 'Motorola', 'e13', 'ori s/aro', 80.00),
(320, 'Motorola', 'e13', 'c/aro', 100.00),
(321, 'Motorola', 'e13', 'na s/aro', 100.00),
(322, 'Motorola', 'e20', 's/aro', 70.00),
(323, 'Motorola', 'e20', 'ori s/aro', 80.00),
(324, 'Motorola', 'e20', 'c/aro pa', 85.00),
(325, 'Motorola', 'e20', 'na c/aro', 105.00),
(326, 'Motorola', 'e22', 's/aro', 70.00),
(327, 'Motorola', 'e22', 'ori s/aro', 80.00),
(328, 'Motorola', 'e22', 'c/aro pa', 85.00),
(329, 'Motorola', 'e22', 'na c/aro', 105.00),
(330, 'Motorola', 'e4 plus', 's/aro', 70.00),
(331, 'Motorola', 'e40', 'na s/aro', 100.00),
(332, 'Motorola', 'e40', 'na c/aro', 110.00),
(333, 'Motorola', 'e5 play', 's/aro', 70.00),
(334, 'Motorola', 'e5 play', 'na c/aro', 130.00),
(335, 'Motorola', 'e5 plus', 's/aro', 70.00),
(336, 'Motorola', 'e6 play', 's/aro', 60.00),
(337, 'Motorola', 'e6 plus', 'pa s/aro', 65.00),
(338, 'Motorola', 'e6 plus', 'c/aro', 85.00),
(339, 'Motorola', 'e6 plus', 'na c/aro', 120.00),
(340, 'Motorola', 'e6i', 's/aro', 65.00),
(341, 'Motorola', 'e6i', 'c/aro pa', 100.00),
(342, 'Motorola', 'e6s', 's/aro', 65.00),
(343, 'Motorola', 'e6s', 'na c/aro', 100.00),
(344, 'Motorola', 'e7', 'pa s/aro', 60.00),
(345, 'Motorola', 'e7', 'na s/aro', 85.00),
(346, 'Motorola', 'e7', 'c/aro pa', 85.00),
(347, 'Motorola', 'e7 power', 'pa s/aro', 60.00),
(348, 'Motorola', 'e7 power', 'na s/aro', 85.00),
(349, 'Motorola', 'e7 power', 'c/aro pa', 85.00),
(350, 'Motorola', 'edge', 'na s/aro', 430.00),
(351, 'Motorola', 'edge 20 lite', 'na s/aro', 300.00),
(352, 'Motorola', 'edge 20 lite', 'na c/aro', 500.00),
(353, 'Motorola', 'edge 20 pro', 'na s/aro', 280.00),
(354, 'Motorola', 'edge 20 pro', 'na c/aro', 400.00),
(355, 'Motorola', 'edge 20', 'na s/aro', 280.00),
(356, 'Motorola', 'edge 20', 'na c/aro', 400.00),
(357, 'Motorola', 'edge 30 fusion', 'na s/aro', 360.00),
(358, 'Motorola', 'edge 30', 'na s/aro', 260.00),
(359, 'Motorola', 'edge 30', 'na c/aro', 300.00),
(360, 'Motorola', 'edge 30 neo', 'na s/aro', 400.00),
(361, 'Motorola', 'edge 30 neo', 'na c/aro', 420.00),
(362, 'Motorola', 'edge 40', 'na s/aro', 330.00),
(363, 'Motorola', 'edge 40 neo', 'na s/aro', 260.00),
(364, 'Motorola', 'edge 40 neo', 'na c/aro', 430.00),
(365, 'Motorola', 'edge 50', 'na s/aro', 280.00),
(366, 'Motorola', 'edge 50 pro', 'na s/aro', 280.00),
(367, 'Motorola', 'edge 50 neo', 'na s/aro', 500.00),
(368, 'Motorola', 'edge 50 ultra', 'na s/aro', 450.00),
(369, 'Motorola', 'edge 50 fusion', 'na s/aro', 300.00),
(370, 'Motorola', 'edge 50 fusion', 'na c/aro', 450.00),
(371, 'Motorola', 'edge 60 fusion', 'na s/aro', 450.00),
(372, 'Motorola', 'edge 60 pro', 'na s/aro', 400.00),
(373, 'Motorola', 'fusion plus', 'pa s/aro', 90.00),
(374, 'Motorola', 'fusion plus', 'pa c/aro', 130.00),
(375, 'Motorola', 'g10', 's/aro', 65.00),
(376, 'Motorola', 'g10', 'c/aro', 85.00),
(377, 'Motorola', 'g10', 'na s/aro', 120.00),
(378, 'Motorola', 'g10', 'na c/aro', 130.00),
(379, 'Motorola', 'g100', 'ori s/aro', 150.00),
(380, 'Motorola', 'g100', 'c/aro', 190.00),
(381, 'Motorola', 'g04', 'ori s/aro', 80.00),
(382, 'Motorola', 'g04', 'na s/aro', 100.00),
(383, 'Motorola', 'g04', 'na c/aro', 130.00),
(384, 'Motorola', 'g04', 'ori c/aro', 95.00),
(385, 'Motorola', 'g24', 'ori s/aro', 80.00),
(386, 'Motorola', 'g24', 'na s/aro', 100.00),
(387, 'Motorola', 'g24', 'na c/aro', 130.00),
(388, 'Motorola', 'g24', 'ori c/aro', 95.00),
(389, 'Motorola', 'g05', 'pa s/aro', 80.00),
(390, 'Motorola', 'g05', 'ori s/aro', 115.00),
(391, 'Motorola', 'g05', 'pa c/aro', 100.00),
(392, 'Motorola', 'g13', 'pa s/aro', 75.00),
(393, 'Motorola', 'g13', 'c/aro', 110.00),
(394, 'Motorola', 'g23', 'pa s/aro', 75.00),
(395, 'Motorola', 'g23', 'c/aro', 110.00),
(396, 'Motorola', 'g14', 'ori s/aro', 85.00),
(397, 'Motorola', 'g14', 'c/aro', 100.00),
(398, 'Motorola', 'g14', 'ori c/aro', 100.00),
(399, 'Motorola', 'g54', 'na c/aro', 115.00),
(400, 'Motorola', 'g54', 'ori s/aro', 85.00),
(401, 'Motorola', 'g54', 'c/aro', 100.00),
(402, 'Motorola', 'g54', 'ori c/aro', 100.00),
(403, 'Motorola', 'g55', 'na c/aro', 115.00),
(404, 'Motorola', 'g55', 'ori s/aro', 85.00),
(405, 'Motorola', 'g55', 'c/aro', 100.00),
(406, 'Motorola', 'g55', 'ori c/aro', 100.00),
(407, 'Motorola', 'g15', 'pa c/aro', 100.00),
(408, 'Motorola', 'g15', 'ori s/aro', 115.00),
(409, 'Motorola', 'g15', 'na s/aro', 125.00),
(410, 'Motorola', 'g15', 'pa s/aro', 80.00),
(411, 'Motorola', 'g2', 's/aro', 50.00),
(412, 'Motorola', 'g20', 'pa s/aro', 65.00),
(413, 'Motorola', 'g20', 'na c/aro', 110.00),
(414, 'Motorola', 'g200', 's/aro pa', 100.00),
(415, 'Motorola', 'g22', 's/aro', 75.00),
(416, 'Motorola', 'g22', 'c/aro', 95.00),
(417, 'Motorola', 'g22', 'nacional c/aro', 110.00),
(418, 'Motorola', 'e32', 's/aro', 75.00),
(419, 'Motorola', 'e32', 'c/aro', 95.00),
(420, 'Motorola', 'e32', 'nacional c/aro', 110.00),
(421, 'Motorola', 'g30', 'pa s/aro', 65.00),
(422, 'Motorola', 'g30', 'na c/aro', 110.00),
(423, 'Motorola', 'g31', 'oled c/aro', 180.00),
(424, 'Motorola', 'g31', 'na s/aro', 190.00),
(425, 'Motorola', 'g31', 'nacional c/aro', 220.00),
(426, 'Motorola', 'g41', 'oled c/aro', 180.00),
(427, 'Motorola', 'g41', 'na s/aro', 190.00),
(428, 'Motorola', 'g71', 'oled c/aro', 180.00),
(429, 'Motorola', 'g71', 'na s/aro', 190.00),
(430, 'Motorola', 'g32', 's/aro', 80.00),
(431, 'Motorola', 'g32', 'c/aro', 95.00),
(432, 'Motorola', 'g32', 'na c/aro', 115.00),
(433, 'Motorola', 'g34', 's/aro uni', 80.00),
(434, 'Motorola', 'g34', 'na s/aro', 115.00),
(435, 'Motorola', 'g34', 'c/aro', 110.00),
(436, 'Motorola', 'g35', 's/aro', 90.00),
(437, 'Motorola', 'g35', 'c/aro', 110.00),
(438, 'Motorola', 'g4', 'c/aro', 130.00),
(439, 'Motorola', 'g4 plus', 'c/aro', 130.00),
(440, 'Motorola', 'g42', 'oled s/aro', 160.00),
(441, 'Motorola', 'g42', 'na c/aro', 205.00),
(442, 'Motorola', 'g5 plus', 's/aro', 65.00),
(443, 'Motorola', 'g5 plus', 'com digital', 160.00),
(444, 'Motorola', 'g50', 'na s/aro', 120.00),
(445, 'Motorola', 'g52', 'na s/aro', 260.00),
(446, 'Motorola', 'g52', 'c/aro', 300.00),
(447, 'Motorola', 'g71s', 'na s/aro', 260.00),
(448, 'Motorola', 'g71s', 'c/aro', 300.00),
(449, 'Motorola', 'g82', 'na s/aro', 260.00),
(450, 'Motorola', 'g82', 'c/aro', 300.00),
(451, 'Motorola', 'g53', 's/aro uni', 80.00),
(452, 'Motorola', 'g53', 'c/aro pa', 100.00),
(453, 'Motorola', 'g53', 'c/aro com acessórios', 120.00),
(454, 'Motorola', 'g56', 'ori s/aro', 120.00),
(455, 'Motorola', 'g56', 'na s/aro', 130.00),
(456, 'Motorola', 'g5g', 'ori s/aro', 120.00),
(457, 'Motorola', 'g5g', 'na c/aro', 160.00),
(458, 'Motorola', 'g5g plus', 'boa s/aro', 140.00),
(459, 'Motorola', 'g5s', 's/aro', 60.00),
(460, 'Motorola', 'g5s plus', 's/aro', 60.00),
(461, 'Motorola', 'g6', 's/aro', 80.00),
(462, 'Motorola', 'g6', 'na c/aro', 155.00),
(463, 'Motorola', 'g6 play', 's/aro', 60.00),
(464, 'Motorola', 'g6 play', 'c/aro', 80.00),
(465, 'Motorola', 'g6 plus', 's/aro', 75.00),
(466, 'Motorola', 'g60', 'pa s/aro', 95.00),
(467, 'Motorola', 'g60', 'c/aro pa', 110.00),
(468, 'Motorola', 'g62', 'ori s/aro', 100.00),
(469, 'Motorola', 'g62', 'na c/aro', 115.00),
(470, 'Motorola', 'g7', 's/aro', 90.00),
(471, 'Motorola', 'g7 play', 's/aro', 70.00),
(472, 'Motorola', 'g7 play', 'c/aro', 90.00),
(473, 'Motorola', 'g7 power', 's/aro', 70.00),
(474, 'Motorola', 'g7 power', 'na c/aro', 180.00),
(475, 'Motorola', 'g73', 's/aro', 80.00),
(476, 'Motorola', 'g73', 'ori s/aro', 120.00),
(477, 'Motorola', 'g73', 'na c/aro', 150.00),
(478, 'Motorola', 'g75', 'ori s/aro', 160.00),
(479, 'Motorola', 'g8', 's/aro', 85.00),
(480, 'Motorola', 'g8', 'na c/aro', 180.00),
(481, 'Motorola', 'g8 play', 'pa s/aro', 65.00),
(482, 'Motorola', 'g8 play', 'na c/aro', 130.00),
(483, 'Motorola', 'g8 plus', 'pa s/aro', 70.00),
(484, 'Motorola', 'g8 plus', 'c/aro', 110.00),
(485, 'Motorola', 'g8 power', 's/aro', 85.00),
(486, 'Motorola', 'g8 power', 'ori c/aro', 150.00),
(487, 'Motorola', 'g8 power', 'na c/aro', 200.00),
(488, 'Motorola', 'g8 power lite', 'pa s/aro', 65.00),
(489, 'Motorola', 'g8 power lite', 'c/aro pa', 85.00),
(490, 'Motorola', 'g84', 'na s/aro', 260.00),
(491, 'Motorola', 'g84', 'ori c/aro', 280.00),
(492, 'Motorola', 'g84', 'na c/aro', 350.00),
(493, 'Motorola', 'g85', 'na s/aro', 300.00),
(494, 'Motorola', 'g85', 'na c/aro', 400.00),
(495, 'Motorola', 'g9 play', 'pa s/aro', 65.00),
(496, 'Motorola', 'g9 play', 'c/aro pa', 85.00),
(497, 'Motorola', 'g9 play', 'na s/aro', 110.00),
(498, 'Motorola', 'e7 plus', 'pa s/aro', 65.00),
(499, 'Motorola', 'e7 plus', 'c/aro pa', 85.00),
(500, 'Motorola', 'e7 plus', 'na s/aro', 110.00),
(501, 'Motorola', 'g9 plus', 's/aro', 85.00),
(502, 'Motorola', 'g9 plus', 'c/aro', 110.00),
(503, 'Motorola', 'g9 plus', 'na c/aro', 150.00),
(504, 'Motorola', 'g9 power', 's/aro', 85.00),
(505, 'Motorola', 'g9 power', 'c/aro', 115.00),
(506, 'Motorola', 'one', 's/aro', 70.00),
(507, 'Motorola', 'one', 'c/aro pa', 100.00),
(508, 'Motorola', 'one', 'na c/aro', 160.00),
(509, 'Motorola', 'one fusion', 'pa s/aro', 70.00),
(510, 'Motorola', 'one fusion', 'c/aro pa', 100.00),
(511, 'Motorola', 'one fusion', 'na s/aro', 120.00),
(512, 'Motorola', 'one hyper', 'pa s/aro', 85.00),
(513, 'Motorola', 'one macro', 'pa s/aro', 65.00),
(514, 'Motorola', 'one macro', 'na c/aro', 150.00),
(515, 'Motorola', 'one vision', 'na c/aro', 250.00),
(516, 'Motorola', 'one zoom', 'oled s/aro', 150.00),
(517, 'Motorola', 'one zoom', 'na s/aro', 380.00),
(518, 'Motorola', 'x force', 's/aro', 300.00),
(519, 'Motorola', 'x2', 'c/aro', 100.00),
(520, 'Motorola', 'x4', 'ori s/aro', 100.00),
(521, 'Motorola', 'x4', 'na s/aro', 120.00),
(522, 'Motorola', 'z play', 'nacional', 220.00),
(523, 'Motorola', 'z2 force', 's/aro retirado', 280.00),
(524, 'Motorola', 'z2 play', 'oled', 120.00),
(525, 'Motorola', 'z3 play', 'oled', 180.00),
(526, 'Motorola', 'z3 play', 'na s/aro', 300.00),
(527, 'LG', 'k10 2017', 'pa s/aro', 80.00),
(528, 'LG', 'k10 power', 's/aro', 80.00),
(529, 'LG', 'k10 sem tv', 'pa s/aro', 80.00),
(530, 'LG', 'k10', 'na s/aro', 90.00),
(531, 'LG', 'k11 plus', 's/aro', 80.00),
(532, 'LG', 'k12 prime', 's/aro', 80.00),
(533, 'LG', 'k12 prime', 'c/aro', 120.00),
(534, 'LG', 'k12 max', 's/aro', 80.00),
(535, 'LG', 'k12 max', 'c/aro', 120.00),
(536, 'LG', 'k50', 's/aro', 80.00),
(537, 'LG', 'k50', 'c/aro', 120.00),
(538, 'LG', 'k12 plus', 's/aro', 80.00),
(539, 'LG', 'k12 plus', 'c/aro', 120.00),
(540, 'LG', 'k200', 's/aro', 80.00),
(541, 'LG', 'k22', 'c/aro pa', 90.00),
(542, 'LG', 'k22', 's/aro nna', 110.00),
(543, 'LG', 'k22', 'sem aro', 75.00),
(544, 'LG', 'k220', 's/aro', NULL),
(545, 'LG', 'k4 2017', 's/aro', 70.00),
(546, 'LG', 'k40s', 's/aro', 80.00),
(547, 'LG', 'k40s', 'c/aro', 115.00),
(548, 'LG', 'k41s', 's/aro', 80.00),
(549, 'LG', 'k41s', 'c/aro', 115.00),
(550, 'LG', 'k41s', 'c/aro com flex', 130.00),
(551, 'LG', 'k50s', 's/aro', 85.00),
(552, 'LG', 'k50s', 'c/aro', 95.00),
(553, 'LG', 'k51s', 's/aro', 90.00),
(554, 'LG', 'k51s', 'c/aro', 115.00),
(555, 'LG', 'k52', 's/aro', 80.00),
(556, 'LG', 'k52', 'c/aro', 130.00),
(557, 'LG', 'k52', 'na c/aro', 180.00),
(558, 'LG', 'k61', 's/aro', 90.00),
(559, 'LG', 'k61', 'c/aro pa', 130.00),
(560, 'LG', 'k62', 's/aro', 80.00),
(561, 'LG', 'k62', 'c/aro', 130.00),
(562, 'LG', 'k62', 'na c/aro', 180.00),
(563, 'LG', 'k71', 'na s/aro', 250.00),
(564, 'LG', 'k8', 's/aro', 80.00),
(565, 'LG', 'k8 2017', 'na s/aro', 80.00),
(566, 'LG', 'k8 plus', 'c/aro', 85.00),
(567, 'LG', 'k9', 's/aro', 80.00),
(568, 'Xiaomi', '5 plus', 's/aro', 85.00),
(569, 'Xiaomi', 'note 5', 's/aro', 85.00),
(570, 'Xiaomi', 'mi 6 pro', 's/aro', 85.00),
(571, 'Xiaomi', 'mi a1', 's/aro', 85.00),
(572, 'Xiaomi', 'mi a2', 's/aro', 100.00),
(573, 'Xiaomi', 'mi a2 lite', 's/aro', 85.00),
(574, 'Xiaomi', 'mi a3', 'in s/aro', 110.00),
(575, 'Xiaomi', 'mi a3', 'oled', 280.00),
(576, 'Xiaomi', 'mi a3', 'na c/aro', 450.00),
(577, 'Xiaomi', 'mi 8', 'oled s/aro', 280.00),
(578, 'Xiaomi', 'mi 8 lite', 's/aro', 85.00),
(579, 'Xiaomi', 'mi 8 lite', 'c/aro', 120.00),
(580, 'Xiaomi', 'mi 9', 'oled', 180.00),
(581, 'Xiaomi', 'mi 9 lite', 'oled s/aro', 165.00),
(582, 'Xiaomi', 'mi 9 se', 'na c/aro', 400.00),
(583, 'Xiaomi', 'mi 9t', 'oled', 240.00),
(584, 'Xiaomi', 'mi note 10 pro curva', 'na s/aro', 270.00),
(585, 'Xiaomi', 'mi 10t', 's/aro n', 220.00),
(586, 'Xiaomi', 'mi 11 lite', 'na s/aro', 250.00),
(587, 'Xiaomi', 'mi 11 lite', 'na c/aro', 350.00),
(588, 'Xiaomi', 'mi 11t', 'na s/aro', 340.00),
(589, 'Xiaomi', 'mi 12t', 'na s/aro', 350.00),
(590, 'Xiaomi', 'mi 12t pro', 'na s/aro', 350.00),
(591, 'Xiaomi', 'mi 13 lite', 'na s/aro', 300.00),
(592, 'Xiaomi', 'mi max 3', 's/aro', 160.00),
(593, 'Xiaomi', 'redmi 4x', 's/aro', 85.00),
(594, 'Xiaomi', 'redmi 5', 's/aro', 85.00),
(595, 'Xiaomi', 'redmi 5a', 's/aro', 85.00),
(596, 'Xiaomi', 'redmi go', 's/aro', 85.00),
(597, 'Xiaomi', 'redmi 6/6a', 's/aro', 85.00),
(598, 'Xiaomi', 'redmi 7', 's/aro', 85.00),
(599, 'Xiaomi', 'redmi 7', 'c/aro', 100.00),
(600, 'Xiaomi', 'redmi 7a', 's/aro', 85.00),
(601, 'Xiaomi', 'redmi 8', 's/aro', 90.00),
(602, 'Xiaomi', 'redmi 8', 'c/aro', 120.00),
(603, 'Xiaomi', 'redmi 8a', 's/aro', 90.00),
(604, 'Xiaomi', 'redmi 8a', 'c/aro', 120.00),
(605, 'Xiaomi', 'redmi 9', 's/aro', 85.00),
(606, 'Xiaomi', 'redmi 9', 'c/aro', 100.00),
(607, 'Xiaomi', 'redmi 9c', 's/aro', 85.00),
(608, 'Xiaomi', 'redmi 9c', 'c/aro pa', 100.00),
(609, 'Xiaomi', 'redmi 9a', 's/aro', 85.00),
(610, 'Xiaomi', 'redmi 9a', 'c/aro pa', 100.00),
(611, 'Xiaomi', 'redmi 10a', 's/aro', 85.00),
(612, 'Xiaomi', 'redmi 10a', 'c/aro pa', 100.00),
(613, 'Xiaomi', 'redmi 10', 'ori s/aro', 95.00),
(614, 'Xiaomi', 'redmi 10', 'c/aro', 130.00),
(615, 'Xiaomi', 'redmi 10', 'na s/aro', 160.00),
(616, 'Xiaomi', 'redmi 10 prime', 'c/aro', 95.00),
(617, 'Xiaomi', 'redmi 10c', 'boa s/aro', 85.00),
(618, 'Xiaomi', 'redmi 10c', 'boa c/aro', 90.00),
(619, 'Xiaomi', 'redmi 12', 's/aro', 90.00),
(620, 'Xiaomi', 'redmi 12', 'c/aro pa', 100.00),
(621, 'Xiaomi', 'redmi 12', 'na s/aro', 120.00),
(622, 'Xiaomi', 'redmi 12c', 's/aro', 90.00),
(623, 'Xiaomi', 'redmi 12c', 'na s/aro', 115.00),
(624, 'Xiaomi', 'redmi 12c', 'c/aro', 90.00),
(625, 'Xiaomi', 'redmi 12c', 'na s/aro', 120.00),
(626, 'Xiaomi', 'redmi 13', 's/aro', 90.00),
(627, 'Xiaomi', 'redmi 13', 'c/aro', 125.00),
(628, 'Xiaomi', 'redmi 13', 'na s/aro', 120.00),
(629, 'Xiaomi', 'redmi 13c', 'pa s/aro', 70.00),
(630, 'Xiaomi', 'redmi 13c', 'ori s/aro', 90.00),
(631, 'Xiaomi', 'redmi 13c', 'c/aro na', 135.00),
(632, 'Xiaomi', 'redmi 13c', 'pa c/aro', 90.00),
(633, 'Xiaomi', 'redmi 14c', 'boa s/aro', 90.00),
(634, 'Xiaomi', 'redmi 14c', 'c/aro', 115.00),
(635, 'Xiaomi', 'redmi 14c', 'nacional s/aro', 110.00),
(636, 'Xiaomi', 'redmi 15c', 's/aro', 90.00),
(637, 'Xiaomi', 'redmi s2', 's/aro', 85.00),
(638, 'Xiaomi', 'redmi note 4', 's/aro', 85.00),
(639, 'Xiaomi', 'redmi note 4x', 's/aro', 85.00),
(640, 'Xiaomi', 'redmi note 5', 's/aro', 85.00),
(641, 'Xiaomi', 'redmi note 5 pro', 's/aro', 85.00),
(642, 'Xiaomi', 'redmi note 6 pro', 's/aro', 90.00),
(643, 'Xiaomi', 'redmi note 7', 's/aro', 75.00),
(644, 'Xiaomi', 'redmi note 7', 'c/aro', 120.00),
(645, 'Xiaomi', 'redmi note 8', 's/aro', 75.00),
(646, 'Xiaomi', 'redmi note 8', 'c/aro', 100.00),
(647, 'Xiaomi', 'redmi note 8', 'ori s/aro', 85.00),
(648, 'Xiaomi', 'redmi note 8', 'na s/aro', 160.00),
(649, 'Xiaomi', 'redmi note 8 pro', 's/aro', 85.00),
(650, 'Xiaomi', 'redmi note 8 pro', 'c/aro', 130.00),
(651, 'Xiaomi', 'redmi note 9', 's/aro', 90.00),
(652, 'Xiaomi', 'redmi note 9', 'c/aro', 120.00),
(653, 'Xiaomi', 'redmi note 9 pro', 's/aro', 90.00),
(654, 'Xiaomi', 'redmi note 9 pro', 'c/aro', 130.00),
(655, 'Xiaomi', 'redmi note 10 4g', 'hd c/aro', 110.00),
(656, 'Xiaomi', 'redmi note 10 4g', 'oled s/aro', 160.00),
(657, 'Xiaomi', 'redmi note 10 4g', 'oled c/aro', 170.00),
(658, 'Xiaomi', 'redmi note 10 5g', 'na s/aro', 110.00),
(659, 'Xiaomi', 'redmi note 10 5g', 'c/aro', 130.00),
(660, 'Xiaomi', 'redmi note 10 pro', 'in s/aro', 100.00),
(661, 'Xiaomi', 'redmi note 10 pro', 'in c/aro', 135.00),
(662, 'Xiaomi', 'redmi note 10 pro', 'oled s/aro', 205.00),
(663, 'Xiaomi', 'redmi note 10 pro', 'oled c/aro', 220.00),
(664, 'Xiaomi', 'redmi note 11', 'incell', 100.00),
(665, 'Xiaomi', 'redmi note 11', 'oled s/aro', 170.00),
(666, 'Xiaomi', 'redmi note 11', 'oled c/aro', 200.00),
(667, 'Xiaomi', 'redmi note 11', 'na c/aro', 600.00),
(668, 'Xiaomi', 'redmi note 11 5g', 's/aro', 95.00),
(669, 'Xiaomi', 'redmi note 11e', 's/aro', 85.00),
(670, 'Xiaomi', 'redmi note 11e', 'c/aro', 120.00),
(671, 'Xiaomi', 'redmi note 12 4g', 'incell c/aro', 100.00),
(672, 'Xiaomi', 'redmi note 12 4g', 'oled s/aro', 210.00),
(673, 'Xiaomi', 'redmi note 12 4g', 'oled c/aro', 230.00),
(674, 'Xiaomi', 'redmi note 12 pro 4g', 'incell s/aro', 100.00),
(675, 'Xiaomi', 'redmi note 12 pro 4g', 'incell c/aro', 115.00),
(676, 'Xiaomi', 'redmi note 12 pro 4g', 'oled s/aro', 205.00),
(677, 'Xiaomi', 'redmi note 12 pro 4g', 'oled c/aro', 220.00),
(678, 'Xiaomi', 'redmi note 13 4g', 'in s/aro', 90.00),
(679, 'Xiaomi', 'redmi note 13 4g', 'in c/aro', 125.00),
(680, 'Xiaomi', 'redmi note 13 4g', 'oled s/aro', 205.00),
(681, 'Xiaomi', 'redmi note 13 4g', 'na s/aro', 380.00),
(682, 'Xiaomi', 'redmi note 13 5g', 'na s/aro', 280.00),
(683, 'Xiaomi', 'redmi note 13 5g', 'na c/aro', 300.00),
(684, 'Xiaomi', 'redmi note 13 pro 4g', 'oled s/aro', 280.00),
(685, 'Xiaomi', 'redmi note 13 pro 4g', 'na s/aro', 350.00),
(686, 'Xiaomi', 'redmi note 13 pro 4g', 'c/aro', 390.00),
(687, 'Xiaomi', 'redmi note 13 pro 5g', 'na s/aro', 320.00),
(688, 'Xiaomi', 'redmi note 13 pro 5g', 'na c/aro', 370.00),
(689, 'Xiaomi', 'redmi note 13 pro plus', 'na s/aro', 380.00),
(690, 'Xiaomi', 'redmi note 13 pro plus', 'c/aro', 410.00),
(691, 'Xiaomi', 'redmi note 14 4g', 'na c/aro', 500.00),
(692, 'Xiaomi', 'poco c40', 'boa s/aro', 85.00),
(693, 'Xiaomi', 'poco c40', 'boa c/aro', 90.00),
(694, 'Xiaomi', 'poco c65', 'pa s/aro', 70.00),
(695, 'Xiaomi', 'poco c65', 'ori s/aro', 90.00),
(696, 'Xiaomi', 'poco c65', 'c/aro na', 135.00),
(697, 'Xiaomi', 'poco c65', 'pa c/aro', 90.00),
(698, 'Xiaomi', 'poco c71', 's/aro', 90.00),
(699, 'Xiaomi', 'poco c75', 'boa s/aro', 90.00),
(700, 'Xiaomi', 'poco c75', 'c/aro', 115.00),
(701, 'Xiaomi', 'poco c75', 'nacional s/aro', 110.00),
(702, 'Xiaomi', 'poco f1', 's/aro', 90.00),
(703, 'Xiaomi', 'poco f1', 'c/aro', 140.00),
(704, 'Xiaomi', 'poco f4', 'oled c/aro', 235.00),
(705, 'Xiaomi', 'poco f4', 'oled s/aro', 220.00),
(706, 'Xiaomi', 'poco f4', 'na c/aro', 580.00),
(707, 'Xiaomi', 'poco f4', 'incell c/aro', 115.00),
(708, 'Xiaomi', 'poco f4 gt', 'na s/aro', 250.00),
(709, 'Xiaomi', 'poco f5', 'na s/aro', 280.00),
(710, 'Xiaomi', 'poco f5 pro', 'na s/aro', 500.00),
(711, 'Xiaomi', 'poco f6 pro', 'na s/aro', 280.00),
(712, 'Xiaomi', 'poco f6 pro', 'na c/aro', 450.00),
(713, 'Xiaomi', 'poco m3 pro 5g', 'na s/aro', 110.00),
(714, 'Xiaomi', 'poco m3 pro 5g', 'c/aro', 130.00),
(715, 'Xiaomi', 'poco m6 pro 4g', 'na s/aro', 350.00),
(716, 'Xiaomi', 'poco m6 pro 5g', 'na s/aro', 120.00),
(717, 'Xiaomi', 'poco m7', 'na s/aro', 400.00),
(718, 'Xiaomi', 'poco m7 pro', 'na s/aro', 380.00),
(719, 'Xiaomi', 'poco x3', 'sem aro na', 135.00),
(720, 'Xiaomi', 'poco x3', 'pa s/aro', 85.00),
(721, 'Xiaomi', 'poco x3', 'c/aro', 140.00),
(722, 'Xiaomi', 'poco x3 nfc', 'sem aro na', 135.00),
(723, 'Xiaomi', 'poco x3 nfc', 'pa s/aro', 85.00),
(724, 'Xiaomi', 'poco x3 nfc', 'c/aro', 140.00),
(725, 'Xiaomi', 'poco x3 pro', 'sem aro na', 135.00),
(726, 'Xiaomi', 'poco x3 pro', 'pa s/aro', 85.00),
(727, 'Xiaomi', 'poco x3 pro', 'c/aro', 140.00),
(728, 'Xiaomi', 'poco x3 gt', 's/aro', 130.00),
(729, 'Xiaomi', 'poco x3 gt', 'na s/aro', 210.00),
(730, 'Xiaomi', 'poco x4 pro', 'incell s/aro', 100.00),
(731, 'Xiaomi', 'poco x4 pro', 'incell c/aro', 115.00),
(732, 'Xiaomi', 'poco x4 pro', 'oled s/aro', 205.00),
(733, 'Xiaomi', 'poco x4 pro', 'na c/aro', 550.00),
(734, 'Xiaomi', 'poco x5', 'incell s/aro', 100.00),
(735, 'Xiaomi', 'poco x5', 'incell c/aro', 120.00),
(736, 'Xiaomi', 'poco x5', 'na c/aro', 430.00),
(737, 'Xiaomi', 'poco x5 pro', 'na s/aro', 250.00),
(738, 'Xiaomi', 'poco x6', 'na s/aro', 320.00),
(739, 'Xiaomi', 'poco x6', 'na c/aro', 450.00),
(740, 'Xiaomi', 'poco x6 pro', 'na s/aro', 280.00),
(741, 'Xiaomi', 'poco x6 pro', 'na c/aro', 450.00),
(742, 'Xiaomi', 'poco x7', 'na s/aro', 380.00),
(743, 'Xiaomi', 'poco x7 pro', 'na s/aro', 350.00),
(744, 'Xiaomi', 'poco x7 pro', 'na c/aro', 450.00),
(745, 'Lenovo', 'c2', 'na s/aro', 85.00),
(746, 'Lenovo', 'k5', 'na c/aro', 100.00),
(747, 'Lenovo', 'k6', 'na c/aro', 100.00),
(748, 'Lenovo', 'k6 plus', 'na c/aro', 110.00),
(749, 'Tablet', 'redmi pad se 11 polegadas', 'na s/aro', 290.00),
(750, 'Tablet', 'redmi pad 10.6', 's/aro', 300.00),
(751, 'Tablet', 'p615', 'na s/aro', 300.00),
(752, 'Tablet', 'x110', 's/aro', 210.00),
(753, 'Tablet', 'x115', 's/aro', 210.00),
(754, 'Tablet', 'x210', 's/aro', 230.00),
(755, 'Tablet', 'x210', 'ori na s/aro', 260.00),
(756, 'Tablet', 'x215', 's/aro', 230.00),
(757, 'Tablet', 'x215', 'ori na s/aro', 260.00),
(758, 'Tablet', 'x200', 's/aro', 230.00),
(759, 'Tablet', 'x510', 'na s/aro', 300.00),
(760, 'Tablet', 't870', 's/aro', 450.00),
(761, 'Tablet', 't285', 's/aro', 135.00),
(762, 'Tablet', 't285', 'na s/aro', 280.00),
(763, 'Tablet', 't225', 'na s/aro', 180.00),
(764, 'Tablet', 't225', 'c/aro', 300.00),
(765, 'Tablet', 't295', 's/aro', 135.00),
(766, 'Tablet', 't295', 'completo', 300.00),
(767, 'Tablet', 't500', 'pa s/aro', 220.00),
(768, 'Tablet', 't500', 's/aro', 350.00),
(769, 'Tablet', 't515', 's/aro', 280.00),
(770, 'Tablet', 't510', 's/aro', 280.00),
(771, 'Tablet', 't515', 'c/aro', 300.00),
(772, '', 'realme 7i', 's/aro', 85.00),
(773, '', 'realme 7i', 'c/aro', 120.00),
(774, '', 'realme 7', 'ori s/aro', 90.00),
(775, '', 'realme 8i', 's/aro', 85.00),
(776, '', 'realme 8i', 'c/aro', 120.00),
(777, '', 'realme c11', 's/aro', 85.00),
(778, '', 'realme c11 2021', 'c/aro', 120.00),
(779, '', 'realme c15', 's/aro', 85.00),
(780, '', 'realme c15', 'c/aro', 100.00),
(781, '', 'realme c21y', 'boa s/aro', 85.00),
(782, '', 'realme c25', 's/aro', 80.00),
(783, '', 'realme c3', 's/aro', 85.00),
(784, '', 'realme c3', 'c/aro', 100.00),
(785, '', 'realme c30s', 'c/aro', 100.00),
(786, '', 'realme c33', 'ori', 85.00),
(787, '', 'realme c35', 's/aro', 85.00),
(788, '', 'realme c35', 'c/aro', 120.00),
(789, '', 'realme c61', 's/aro', 90.00),
(790, '', 'realme c61', 'c/aro', 110.00),
(791, '', 'realme c63', 's/aro', 90.00),
(792, '', 'realme c63', 'c/aro', 110.00),
(793, '', 'realme c53', 'ori', 85.00),
(794, '', 'realme c53', 'c/aro', 95.00),
(795, '', 'realme note 50', 'ori', 85.00),
(796, '', 'realme note 50', 'c/aro', 95.00),
(797, '', 'realme c55', 's/aro', 95.00),
(798, '', 'realme c55', 'ori c/aro', 150.00),
(799, '', 'realme c67', 's/aro', 95.00),
(800, '', 'realme c75', 'ori s/aro', 90.00),
(801, '', 'realme 11 pro plus', 'na s/aro', 320.00),
(802, '', 'realme 12 4g', 'oled s/aro', 240.00),
(803, '', 'realme 12 pro plus', 'ori s/aro', 300.00),
(804, '', 'nokia 1.3', 's/aro', 70.00),
(805, '', 'nokia 1.4', 's/aro', 80.00),
(806, '', 'nokia 2.2', 's/aro', 75.00),
(807, '', 'nokia 2.3', 's/aro', 75.00),
(808, '', 'nokia 2.4', 's/aro', 85.00),
(809, '', 'nokia 5.3', 's/aro', 100.00),
(810, '', 'nokia 5.4', 's/aro', 85.00),
(811, '', 'nokia c01 plus', 's/aro', 80.00),
(812, '', 'nokia c2', 's/aro', 75.00),
(813, '', 'nokia c20', 's/aro', 90.00),
(814, '', 'nokia c21', 's/aro', 85.00),
(815, '', 'nokia c30', 's/aro', 90.00),
(816, '', 'nokia g11 plus', 's/aro', 85.00),
(817, '', 'nokia g50', 's/aro', 90.00),
(818, 'Infinix', 'hot 11 x689f', 's/aro', 80.00),
(819, 'Infinix', 'hot 11 play', 'boa s/aro', 100.00),
(820, 'Infinix', 'hot 11s', 's/aro', 95.00),
(821, 'Infinix', 'hot 11s', 'c/aro', 130.00),
(822, 'Infinix', 'hot 20i', 's/aro', 110.00),
(823, 'Infinix', 'hot 30i', 's/aro', 90.00),
(824, 'Infinix', 'hot 30 5g', 's/aro', 95.00),
(825, 'Infinix', 'hot 40 pro', 's/aro', 95.00),
(826, 'Infinix', 'hot 40i', 's/aro', 80.00),
(827, 'Infinix', 'hot 50 4g', 'ori s/aro', 120.00),
(828, 'Infinix', 'hot 50i', 's/aro', 90.00),
(829, 'Infinix', 'hot 50i', 'na s/aro', 110.00),
(830, 'Infinix', 'hot 50 5g', 's/aro', 90.00),
(831, 'Infinix', 'hot 50 5g', 'na s/aro', 110.00),
(832, 'Infinix', 'smart 9', 's/aro', 90.00),
(833, 'Infinix', 'smart 9', 'na s/aro', 110.00),
(834, 'Infinix', 'note 10 pro', 's/aro', 90.00),
(835, 'Infinix', 'note 10 pro', 'boa s/aro', 100.00),
(836, 'Infinix', 'note 12 pro', 'na s/aro', 200.00),
(837, 'Infinix', 'note 30 5g', 's/aro', 95.00),
(838, 'Infinix', 'note 30 4g', 's/aro', 95.00),
(839, 'Infinix', 'smart 6', 's/aro', 80.00),
(840, 'Infinix', 'smart 7', 's/aro', 80.00),
(841, 'Infinix', 'smart 8', 's/aro', 80.00),
(842, 'Infinix', 'smart 8 pro', 's/aro', 80.00),
(843, 'Infinix', 'zero 8/8i', 's/aro', 120.00),
(844, 'Infinix', 'zero 8', 's/aro', 120.00),
(845, 'Huawei', 'nova 3i', 's/aro', 150.00),
(846, 'Huawei', 'p30 lite', 's/aro', 200.00),
(847, 'Huawei', 'p30 pro', 's/aro', 530.00),
(848, 'Apple', 'iPhone 6', 's/aro', 55.00),
(849, 'Apple', 'iPhone 6 Plus', 's/aro', 70.00),
(850, 'Apple', 'iPhone 6s', 's/aro', 55.00),
(851, 'Apple', 'iPhone 6s Plus', 'hd', 120.00),
(852, 'Apple', 'iPhone 7', 's/aro', 60.00),
(853, 'Apple', 'iPhone 7', 'hd', 90.00),
(854, 'Apple', 'iPhone 7 Plus', 's/aro', 80.00),
(855, 'Apple', 'iPhone 7 Plus', 'hd', 110.00),
(856, 'Apple', 'iPhone 7 Plus', 'hd', 115.00),
(857, 'Apple', 'iPhone 8', 's/aro', 60.00),
(858, 'Apple', 'iPhone 8', 'hd', 90.00),
(859, 'Apple', 'iPhone 8 Plus', 's/aro', 80.00),
(860, 'Apple', 'iPhone 8 Plus', 'hd', 110.00),
(861, 'Apple', 'iPhone 8 Plus', 'hd', 115.00),
(862, 'Apple', 'iPhone X', 'incell jk', 120.00),
(863, 'Apple', 'iPhone X', 'oled gx', 165.00),
(864, 'Apple', 'iPhone XR', 'panda', 100.00),
(865, 'Apple', 'iPhone XR', 'premium', 160.00),
(866, 'Apple', 'iPhone XR', 'ori recuperado', 200.00),
(867, 'Apple', 'iPhone XR', 'premium', 160.00),
(868, 'Apple', 'iPhone XS', 'incell jk', 120.00),
(869, 'Apple', 'iPhone XS', 'oled', 175.00),
(870, 'Apple', 'iPhone XS Max', 'incell jk', 160.00),
(871, 'Apple', 'iPhone XS Max', 'gx oled', 210.00),
(872, 'Apple', 'iPhone XS Max', 'jk oled', 220.00),
(873, 'Apple', 'iPhone XS Max', 'oled mole', 300.00),
(874, 'Apple', 'iPhone 11', 'panda', 100.00),
(875, 'Apple', 'iPhone 11', 's/aro', 120.00),
(876, 'Apple', 'iPhone 11', 'ori recuperado', 200.00),
(877, 'Apple', 'iPhone 11', 'premium', 160.00),
(878, 'Apple', 'iPhone 11 Pro', 'incell jk', 135.00),
(879, 'Apple', 'iPhone 11 Pro', 'oled gx', 190.00),
(880, 'Apple', 'iPhone 11 Pro', 'oled ch', 215.00),
(881, 'Apple', 'iPhone 11 Pro Max', 'incell jk', 180.00),
(882, 'Apple', 'iPhone 11 Pro Max', 'oled gx', 230.00),
(883, 'Apple', 'iPhone 11 Pro Max', 'oled mole', 250.00),
(884, 'Apple', 'iPhone 12 Pro', 'incell jk', 145.00),
(885, 'Apple', 'iPhone 12 Pro', 'oled s/ci', 250.00),
(886, 'Apple', 'iPhone 12 Pro', 'oled mole', 300.00),
(887, 'Apple', 'iPhone 12 Pro', 're', 450.00),
(888, 'Apple', 'iPhone 12', 'incell jk', 145.00),
(889, 'Apple', 'iPhone 12', 'oled s/ci', 250.00),
(890, 'Apple', 'iPhone 12', 'oled mole', 300.00),
(891, 'Apple', 'iPhone 12', 're', 450.00),
(892, 'Apple', 'iPhone 12 Pro Max', 'incell jk', 190.00),
(893, 'Apple', 'iPhone 12 Pro Max', 'incell', 215.00),
(894, 'Apple', 'iPhone 12 Pro Max', 'oled mole', 380.00),
(895, 'Apple', 'iPhone 12 Mini', 'incell', 135.00),
(896, 'Apple', 'iPhone 13', 'incell jk', 180.00),
(897, 'Apple', 'iPhone 13', 'oled mole', 350.00),
(898, 'Apple', 'iPhone 13', 'ori retirado', 550.00),
(899, 'Apple', 'iPhone 13 Pro', 'oled mole', 480.00),
(900, 'Apple', 'iPhone 13 Pro', 'retirado', 1350.00),
(901, 'Apple', 'iPhone 13 Pro', 'incell jk', 190.00),
(902, 'Apple', 'iPhone 13 Pro', 'recondicionado', 900.00),
(903, 'Apple', 'iPhone 13 Pro Max', 'incell jk', 280.00),
(904, 'Apple', 'iPhone 13 Pro Max', 'retirado', 1350.00),
(905, 'Apple', 'iPhone 13 Pro Max', 'oled', 380.00),
(906, 'Apple', 'iPhone 13 Pro Max', 'oled mole', 500.00),
(907, 'Apple', 'iPhone 13 Pro Max', 'recondicionado', 1050.00),
(908, 'Apple', 'iPhone 13 Mini', 'incell', 150.00),
(909, 'Apple', 'iPhone 14', 'incell jk', 200.00),
(910, 'Apple', 'iPhone 14', 'oled duro', 300.00),
(911, 'Apple', 'iPhone 14', 'oled mole jk', 320.00),
(912, 'Apple', 'iPhone 14', 'na retirado', 700.00),
(913, 'Apple', 'iPhone 14 Plus', 'ori retirado', 800.00),
(914, 'Apple', 'iPhone 14 Pro', 'incell jk', 280.00),
(915, 'Apple', 'iPhone 14 Pro', 'oled mole', 670.00),
(916, 'Apple', 'iPhone 14 Pro', 'retirado', 1250.00),
(917, 'Apple', 'iPhone 14 Pro Max', 'incell jk', 380.00),
(918, 'Apple', 'iPhone 14 Pro Max', 'oled mole', 750.00),
(919, 'Apple', 'iPhone 14 Pro Max', 'recondicionado', 1700.00),
(920, 'Apple', 'iPhone 15', 'incell jk', 210.00),
(921, 'Apple', 'iPhone 15', 'oled mole', 520.00),
(922, 'Apple', 'iPhone 15', 'recondicionado', 980.00),
(923, 'Apple', 'iPhone 15', 'retirado', 1100.00),
(924, 'Apple', 'iPhone 15 Pro', 'na', 1600.00),
(925, 'Apple', 'iPhone 15 Pro Max', 'oled mole', 900.00),
(926, 'Apple', 'iPhone 15 Pro Max', 'recondicionado', 1900.00),
(927, 'Apple', 'iPhone 15 Pro Max', 'retirado', 2300.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `wifi`
--

CREATE TABLE `wifi` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `wifi`
--

INSERT INTO `wifi` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'iPhone 7', NULL, 25.00),
(2, 'iPhone 8', NULL, 25.00);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alto_falante`
--
ALTER TABLE `alto_falante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_alto_nome` (`nome`),
  ADD KEY `idx_alto_modelo` (`modelo`);

--
-- Índices de tabela `auricular`
--
ALTER TABLE `auricular`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_aur_nome` (`nome`),
  ADD KEY `idx_aur_modelo` (`modelo`);

--
-- Índices de tabela `baterias`
--
ALTER TABLE `baterias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bat_nome` (`nome`),
  ADD KEY `idx_bat_modelo` (`modelo`);

--
-- Índices de tabela `camera_frontal`
--
ALTER TABLE `camera_frontal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cf_nome` (`nome`),
  ADD KEY `idx_cf_modelo` (`modelo`);

--
-- Índices de tabela `camera_traseira`
--
ALTER TABLE `camera_traseira`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ct_nome` (`nome`),
  ADD KEY `idx_ct_modelo` (`modelo`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`);

--
-- Índices de tabela `conector`
--
ALTER TABLE `conector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_con_nome` (`nome`),
  ADD KEY `idx_con_modelo` (`modelo`);

--
-- Índices de tabela `flex_digital`
--
ALTER TABLE `flex_digital`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_fd_nome` (`nome`),
  ADD KEY `idx_fd_modelo` (`modelo`);

--
-- Índices de tabela `flex_power`
--
ALTER TABLE `flex_power`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_fp_nome` (`nome`),
  ADD KEY `idx_fp_modelo` (`modelo`);

--
-- Índices de tabela `flex_sub`
--
ALTER TABLE `flex_sub`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_fsub_nome` (`nome`),
  ADD KEY `idx_fsub_modelo` (`modelo`);

--
-- Índices de tabela `gaveta`
--
ALTER TABLE `gaveta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_gav_nome` (`nome`),
  ADD KEY `idx_gav_modelo` (`modelo`);

--
-- Índices de tabela `grupos_pedidos`
--
ALTER TABLE `grupos_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cliente_id` (`cliente_id`);

--
-- Índices de tabela `lente_camera`
--
ALTER TABLE `lente_camera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_len_nome` (`nome`),
  ADD KEY `idx_len_modelo` (`modelo`);

--
-- Índices de tabela `microfone`
--
ALTER TABLE `microfone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mic_nome` (`nome`),
  ADD KEY `idx_mic_modelo` (`modelo`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pedido_itens`
--
ALTER TABLE `pedido_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`);

--
-- Índices de tabela `tampa`
--
ALTER TABLE `tampa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tam_nome` (`nome`),
  ADD KEY `idx_tam_modelo` (`modelo`);

--
-- Índices de tabela `telas`
--
ALTER TABLE `telas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_telas_marca_nome` (`marca`,`nome`),
  ADD KEY `idx_telas_nome` (`nome`);

--
-- Índices de tabela `wifi`
--
ALTER TABLE `wifi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alto_falante`
--
ALTER TABLE `alto_falante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de tabela `auricular`
--
ALTER TABLE `auricular`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `baterias`
--
ALTER TABLE `baterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT de tabela `camera_frontal`
--
ALTER TABLE `camera_frontal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `camera_traseira`
--
ALTER TABLE `camera_traseira`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `conector`
--
ALTER TABLE `conector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT de tabela `flex_digital`
--
ALTER TABLE `flex_digital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de tabela `flex_power`
--
ALTER TABLE `flex_power`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de tabela `flex_sub`
--
ALTER TABLE `flex_sub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de tabela `gaveta`
--
ALTER TABLE `gaveta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `grupos_pedidos`
--
ALTER TABLE `grupos_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `lente_camera`
--
ALTER TABLE `lente_camera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de tabela `microfone`
--
ALTER TABLE `microfone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `pedido_itens`
--
ALTER TABLE `pedido_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de tabela `tampa`
--
ALTER TABLE `tampa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de tabela `telas`
--
ALTER TABLE `telas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=928;

--
-- AUTO_INCREMENT de tabela `wifi`
--
ALTER TABLE `wifi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `grupos_pedidos`
--
ALTER TABLE `grupos_pedidos`
  ADD CONSTRAINT `grupos_pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `pedido_itens`
--
ALTER TABLE `pedido_itens`
  ADD CONSTRAINT `pedido_itens_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
