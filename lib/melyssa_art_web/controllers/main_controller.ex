defmodule MelyssaArtWeb.MainController do
  use MelyssaArtWeb, :controller

  def show(conn, _) do
    today = Date.utc_today()
    birthday_day? = today.day == 31 and today.month == 7
    birthday? = birthday_day? or Date.compare(today, ~D[2025-08-02])
    render(conn, "show.html", birthday?: birthday?)
  end
end
