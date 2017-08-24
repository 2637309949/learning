package example

import cats.data.Nested
import cats.instances.future._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import cats.Applicative
import cats.instances.option._
import cats.Functor

/**
interface define：
trait Applicative[F[_]] extends Functor[F] {
  def ap[A, B](ff: F[A => B])(fa: F[A]): F[B]

  def pure[A](a: A): F[A]

  def map[A, B](fa: F[A])(f: A => B): F[B] = ap(pure(f))(fa)
}
analysis：
ap function:
  We have an Option[Char => Double] and an Option[Char] to which we want to apply
the function to, but map doesn’t give us enough power to do that. Hence, ap.
 */
object Hello extends Greeting with App {
  println(greeting)

  val x: Future[Option[Int]] = Future.successful(Some(5))
  val y: Future[Option[Char]] = Future.successful(Some('A'))

  val composed = Applicative[Future].compose[Option].map2(x, y)(_ + _)

  // val nested = Applicative[Nested[Future, Option, ?]].map2(Nested(x), Nested(y))(_ + _)

  println(composed)
  // println(nested)
}

trait Greeting {
  lazy val greeting: String = "hello"
}
