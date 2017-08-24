package example

import scala.math.Ordered._
// we need this for `<` to work
import scala.math.Ordered._
// import scala.math.Ordered._

case class Money(amount: Int)
case class Salary(size: Money)

/**
  def by[T, S](f: T => S)(implicit ord: Ordering[S]): Ordering[T]
 */
object Hello extends Greeting with App {
  println(greeting)
  // 1.实例
  // 分析：Ordering.by(_.amount)
  // Money => Int 得到 Ordering[Money]
  // Ordering[Int]已经提供
  // by的方法创建了新的
  // Ordering[Int] ==>> Ordering[Money]
  implicit val moneyOrdering: Ordering[Money] = Ordering.by(_.amount)
  // moneyOrdering: Ordering[Money] = scala.math.Ordering$$anon$10@21972498

  val compRes = Money(100) < Money(200)
  println(compRes)
  // 2.拓展
  // Ordering[Money] ==>> Ordering[Salary]
  implicit val salaryOrdering: Ordering[Salary] = Ordering.by(_.size)
  val compRes2 = Salary(Money(100)) < Salary(Money(200))
  println(compRes2)
}

trait Greeting {
  lazy val greeting: String = "hello"
}
