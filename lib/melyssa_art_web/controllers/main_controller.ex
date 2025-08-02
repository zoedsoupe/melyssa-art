defmodule MelyssaArtWeb.MainController do
  use MelyssaArtWeb, :controller

  def show(conn, _) do
    conn
    |> put_resp_header("conten-type", "text/html")
    |> send_resp(:ok, "<strong>Hello world Melyysa!</strong>")
  end
end
