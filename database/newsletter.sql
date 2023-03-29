-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2023 a las 18:07:22
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `newsletter`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo_adjunto`
--

CREATE TABLE `archivo_adjunto` (
  `id_archivo` int(11) NOT NULL,
  `id_nota` int(11) NOT NULL,
  `archivo` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `celula`
--

CREATE TABLE `celula` (
  `id_celula` int(11) NOT NULL,
  `nombre_celula` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `celula`
--

INSERT INTO `celula` (`id_celula`, `nombre_celula`) VALUES
(1, 'PENSIONES VOLUNTARIAS'),
(2, 'REGULATORIOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `likes_total` int(11) NOT NULL DEFAULT 0,
  `hora_fecha` date NOT NULL,
  `id_nota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_nota`
--

CREATE TABLE `estado_nota` (
  `id_estado_nota` int(11) NOT NULL,
  `nombre_estado_nota` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado_nota`
--

INSERT INTO `estado_nota` (`id_estado_nota`, `nombre_estado_nota`) VALUES
(2, 'IMPORTANTE'),
(1, 'NORMAL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_rol`
--

CREATE TABLE `estado_rol` (
  `id_estado_rol` int(11) NOT NULL,
  `nombre_estado_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado_rol`
--

INSERT INTO `estado_rol` (`id_estado_rol`, `nombre_estado_rol`) VALUES
(1, 'ACTIVO'),
(2, 'INACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `id_nota` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `id_celula` int(11) NOT NULL,
  `hora_fecha` datetime NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `likes_total` int(11) NOT NULL DEFAULT 0,
  `comentarios_total` int(11) NOT NULL DEFAULT 0,
  `estado_nota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`id_nota`, `titulo`, `descripcion`, `id_celula`, `hora_fecha`, `id_usuario`, `likes_total`, `comentarios_total`, `estado_nota`) VALUES
(1, 'Primera nota', 'Esta es la primera nota xd', 1, '2023-03-27 09:19:46', 1, 0, 0, 1),
(3, 'Segunda nota ', 'Esta es la segunda nota xd', 2, '2023-03-27 09:20:13', 1, 0, 0, 2),
(5, 'Tercera nota ', 'Esta es la tercera nota xd', 2, '2023-03-27 09:20:13', 1, 0, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `estado_rol` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `estado_rol`) VALUES
(1, 'ADMINISTRADOR', 1),
(2, 'USUARIO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id_tipo_documento` int(11) NOT NULL,
  `tipo_documento` varchar(50) NOT NULL,
  `nombre_tipo_documento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_tipo_documento`, `tipo_documento`, `nombre_tipo_documento`) VALUES
(2, 'CC', 'Cedula de ciudadania'),
(3, 'CE', 'Cedula de extranjeria'),
(1, 'TI', 'Tarjeta de identidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `id_estado_usuario` int(11) NOT NULL DEFAULT 1,
  `documento` bigint(20) NOT NULL,
  `id_tipo_documento` int(11) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(1000) NOT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 2,
  `forgot_token` varchar(1000) DEFAULT NULL,
  `foto` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `id_estado_usuario`, `documento`, `id_tipo_documento`, `correo`, `contrasena`, `id_rol`, `forgot_token`, `foto`) VALUES
(1, 'fulanito', 'de tal', 1, 111, 1, 'fulanito@detal.com', '123', 2, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id_visitas` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `hora_fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo_adjunto`
--
ALTER TABLE `archivo_adjunto`
  ADD PRIMARY KEY (`id_archivo`);

--
-- Indices de la tabla `celula`
--
ALTER TABLE `celula`
  ADD PRIMARY KEY (`id_celula`),
  ADD UNIQUE KEY `nombre_celula` (`nombre_celula`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`);

--
-- Indices de la tabla `estado_nota`
--
ALTER TABLE `estado_nota`
  ADD PRIMARY KEY (`id_estado_nota`),
  ADD UNIQUE KEY `nombre_estado_nota` (`nombre_estado_nota`);

--
-- Indices de la tabla `estado_rol`
--
ALTER TABLE `estado_rol`
  ADD PRIMARY KEY (`id_estado_rol`),
  ADD UNIQUE KEY `nombre_estado_rol` (`nombre_estado_rol`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id_nota`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id_tipo_documento`),
  ADD UNIQUE KEY `tipo_documento` (`tipo_documento`,`nombre_tipo_documento`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id_visitas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo_adjunto`
--
ALTER TABLE `archivo_adjunto`
  MODIFY `id_archivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `celula`
--
ALTER TABLE `celula`
  MODIFY `id_celula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_nota`
--
ALTER TABLE `estado_nota`
  MODIFY `id_estado_nota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_rol`
--
ALTER TABLE `estado_rol`
  MODIFY `id_estado_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id_visitas` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
