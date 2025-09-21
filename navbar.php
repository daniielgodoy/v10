<?php
// navbar.php
?>
<style>
.navbar {
  background: #007bff;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 14px;
  border-radius: 6px;
  transition: background 0.3s;
}
.navbar a:hover {
  background: rgba(255,255,255,0.2);
}
</style>

<div class="navbar">
  <a href="adicionarpedidos.php">🗒️ Adicionar Pedidos</a>
  <a href="pedidos.php">📑 Gerenciar Pedidos</a>
  <a href="pecas.php">⚙️ Gerenciar Peças</a>
  <a href="addpecas.php">➕ Adicionar Peças</a>  
  <a href="clientes.php">👤 Gerenciar Pessoas</a>
</div>
