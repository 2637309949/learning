import com.thoughtworks.binding.Binding.{Var, Vars}
import com.thoughtworks.binding.{Binding, dom}
import org.scalajs.dom.raw.{Event, Node}

import scala.scalajs.js.JSApp
import org.scalajs.dom.document

object AppTest extends JSApp {
  case class Contact(name: Var[String], email: Var[String])
  val data = Vars.empty[Contact]

  @dom
  def table = {
    <div>
      <button onclick = { event: Event => data.get += Contact(Var("Yang Bo"), Var("yang.bo@rea-group.com")) }>
        Add a contact
      </button>
    </div>
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {
        for (contact <- data) yield {
          <tr>
            <td>
              {contact.name.bind}
            </td>
            <td>
              {contact.email.bind}
            </td>
            <td>
              <button onclick={ event: Event => contact.name := "Modified Name" }>
                Modify the name
              </button>
            </td>
          </tr>
        }
        }
      </tbody>
    </table>
  }
  override def main(): Unit = {
    println("hello...")
    dom.render(document.body, table.asInstanceOf[Binding[Binding.BindingSeq[Node]]])
  }
}
