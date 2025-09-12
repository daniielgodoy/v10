-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/09/2025 às 08:30
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
-- Estrutura para tabela `baterias`
--

CREATE TABLE `baterias` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `baterias`
--

INSERT INTO `baterias` (`id`, `nome`, `modelo`, `preco`) VALUES
(1, 'A01', '', 60.00),
(2, 'A02', '', 60.00),
(3, 'A02S', '', 60.00),
(4, 'A03', '', 60.00),
(5, 'A03 CORE', '', 60.00),
(6, 'A03S', '', 60.00),
(7, 'A05', '', 60.00),
(8, 'A06', '', 60.00),
(9, 'A10', '', 60.00),
(10, 'A10S', '', 60.00),
(11, 'A11', '', 60.00),
(12, 'A14 4G', '', 60.00),
(13, 'A20', '', 60.00),
(14, 'A20S', '', 60.00),
(15, 'A21S', '', 60.00),
(16, 'A22 4G', '', 60.00),
(17, 'A22 5G', '', 60.00),
(18, 'A23', '', 60.00),
(19, 'A30', '', 60.00),
(20, 'A31', '', 60.00),
(21, 'A32', '', 60.00),
(22, 'A34', '', 60.00),
(23, 'A35', '', 60.00),
(24, 'A42', '', 60.00),
(25, 'A50', '', 60.00),
(26, 'A51', '', 60.00),
(27, 'A52', '', 60.00),
(28, 'A53', '', 60.00),
(29, 'A54', '', 60.00),
(30, 'A70', '', 60.00),
(31, 'A71', '', 60.00),
(32, 'A72', '', 60.00),
(33, 'A73', '', 60.00),
(34, 'A750', '', 60.00),
(35, 'G781', '', 60.00),
(36, 'M14', '', 60.00),
(37, 'M20', '', 60.00),
(38, 'M30', '', 60.00),
(39, 'M33', '', 60.00),
(40, 'M51', '', 60.00),
(41, 'M52', '', 60.00),
(42, 'M53', '', 60.00),
(43, 'M54', '', 60.00),
(44, 'M56', '', 60.00),
(45, 'M62', '', 60.00),
(46, 'NOTE 20', '', 60.00),
(47, 'NOTE 20 ULTRA', '', 60.00),
(48, 'S10', '', 60.00),
(49, 'S10 PLUS', '', 60.00),
(50, 'S20', '', 60.00),
(51, 'S20 PUS', '', 60.00),
(52, 'S20 ULTRA', '', 60.00),
(53, 'S21', '', 60.00),
(54, 'S21 FE', '', 60.00),
(55, 'S21 PLUS', '', 60.00),
(56, 'S21 ULTRA', '', 60.00),
(57, 'S22', '', 60.00),
(58, 'S22 PLUS', '', 60.00),
(59, 'S22 ULTRA', '', 60.00),
(60, 'S23', '', 60.00),
(61, 'S6', '', 60.00),
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
(91, 'G6 PLAY', 'Bl270', 60.00),
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
(116, 'IPHONE 6', '', 60.00),
(117, 'IPHONE 6S', '', 60.00),
(118, 'IPHONE 6S PLUS', '', 75.00),
(119, 'IPHONE 7', '', 65.00),
(120, 'IPHONE 7 PLUS', '', 75.00),
(121, 'IPHONE 8', '', 65.00),
(122, 'IPHONE 8 PLUS', '', 80.00),
(123, 'IPHONE X', '', 105.00),
(124, 'IPHONE XS', '', 105.00),
(125, 'IPHONE 11', '', 110.00),
(126, 'IPHONE XR', '', 100.00),
(127, 'IPHONE XS MAX', '', 115.00),
(128, '11 PRO', '', 125.00),
(129, '11 PRO MAX', '', 135.00),
(130, 'IPHONE 12', '', 120.00),
(131, 'IPHONE 12 PRO', '', 120.00),
(132, 'IPHONE 12 PRO MAX', '', 140.00),
(133, 'IPHONE 6', '', 60.00),
(134, 'IPHONE 6S', '', 60.00),
(135, 'IPHONE 6S PLUS', '', 75.00),
(136, 'IPHONE 7', '', 65.00),
(137, 'IPHONE 7 PLUS', '', 75.00),
(138, 'IPHONE 8', '', 65.00),
(139, 'IPHONE 8 PLUS', '', 80.00),
(140, 'IPHONE X', '', 105.00),
(141, 'IPHONE XS', '', 105.00),
(142, 'IPHONE 11', '', 110.00),
(143, 'IPHONE XR', '', 100.00),
(144, 'IPHONE XS MAX', '', 115.00),
(145, '11 PRO', '', 125.00),
(146, '11 PRO MAX', '', 135.00),
(147, 'IPHONE 12', '', 120.00),
(148, 'IPHONE 12 PRO', '', 120.00),
(149, 'IPHONE 12 PRO MAX', '', 140.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `telas`
--

CREATE TABLE `telas` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `qualidade` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `telas`
--

INSERT INTO `telas` (`id`, `nome`, `qualidade`, `preco`) VALUES
(1, 'g10', 'com aro', 200.00),
(2, 'g10', 'nacional', 250.00),
(3, 'g11', 'premium', 300.00),
(4, 'g11', 'standard', 270.00),
(5, 'g10', 'sla', 120.00),
(6, 'g10', 'alguma', 150.00);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `baterias`
--
ALTER TABLE `baterias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `telas`
--
ALTER TABLE `telas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `baterias`
--
ALTER TABLE `baterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT de tabela `telas`
--
ALTER TABLE `telas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
