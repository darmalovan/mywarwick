package services.elasticsearch

import org.elasticsearch.action.index.IndexRequest
import org.elasticsearch.action.update.UpdateRequest
import org.elasticsearch.common.xcontent.XContentBuilder
import org.elasticsearch.index.query.{BoolQueryBuilder, QueryBuilder, QueryBuilders}
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.joda.time.DateTime

trait ActivityESServiceHelper {

  val documentType = "activity" // we use the same type for both alert and activity. they are the same structure but in different indexes
  val nameForAlert = "alert"
  val nameForActivity = "activity"
  val separator = "_"

  object ESFieldName {
    val activity_id = "activity_id"
    val provider_id = "provider_id"
    val activity_type = "activity_type"
    val title = "title"
    val url = "url"
    val text = "text"
    val replaced_by = "replaced_by"
    val published_at = "published_at"
    val publisher = "publisher"
    val resolved_users = "resolved_users"
    val audience_components = "audience_components"
  }

  def hyphenToUnderscore(in: String) = in.replace("-", "_")

  def indexNameToday(isNotification: Boolean = true, today: String = DateTime.now().toString("yyyy_MM")): String = {
    isNotification match {
      case true => s"$nameForAlert$separator$today"
      case false => s"$nameForActivity$separator$today"
    }
  }

  def indexNameForAllTime(isNotification: Boolean = true): String = {
    isNotification match {
      case true => s"$nameForAlert*"
      case false => s"$nameForActivity*"
    }
  }

  def elasticSearchContentBuilderFromActivityDocument(activityDocument: ActivityDocument): XContentBuilder = {
    import org.elasticsearch.common.xcontent.XContentFactory._
    val builder: XContentBuilder = jsonBuilder().startObject()

    builder
      .field(ESFieldName.activity_id, hyphenToUnderscore(activityDocument.activity_id))
      .field(ESFieldName.provider_id, hyphenToUnderscore(activityDocument.provider_id))
      .field(ESFieldName.activity_type, hyphenToUnderscore(activityDocument.activity_type))
      .field(ESFieldName.title, hyphenToUnderscore(activityDocument.title))
      .field(ESFieldName.url, hyphenToUnderscore(activityDocument.url))
      .field(ESFieldName.text, hyphenToUnderscore(activityDocument.text))
      .field(ESFieldName.replaced_by, hyphenToUnderscore(activityDocument.replaced_by))
      .field(ESFieldName.published_at, activityDocument.published_at.toDate)
      .field(ESFieldName.publisher, hyphenToUnderscore(activityDocument.publisher))

    builder.startArray(ESFieldName.resolved_users)
    activityDocument.resolvedUsers.foreach(e => builder.value(hyphenToUnderscore(e)))
    builder.endArray()

    builder.startArray(ESFieldName.audience_components)
    activityDocument.audienceComponents.foreach(e => builder.value(hyphenToUnderscore(e)))
    builder.endArray()

    builder.endObject()
    builder
  }
}

object ActivityESServiceUpdateHelper extends ActivityESServiceHelper {
  def makeUpdateRequest(indexName: String, docType: String, docId: String, docSource: XContentBuilder): UpdateRequest = {
    new UpdateRequest(indexName, docType, docId).doc(docSource)
  }

}

object ActivityESServiceDeleteHelper extends ActivityESServiceHelper

object ActivityESServiceSearchHelper extends ActivityESServiceHelper {

  def makeSearchSourceBuilder(queryBuilder: QueryBuilder): SearchSourceBuilder = {
    val searchSourceBuilder = new SearchSourceBuilder()
    searchSourceBuilder.query(queryBuilder)
  }

  def makeBoolQueryBuilder(activityESSearchQuery: ActivityESSearchQuery): BoolQueryBuilder = {

    val rootBoolQuery: BoolQueryBuilder = new BoolQueryBuilder()

    import QueryBuilders._
    import ESFieldName._

    for (v <- activityESSearchQuery.activity_id) rootBoolQuery.must(termQuery(activity_id, hyphenToUnderscore(v)))

    for (v <- activityESSearchQuery.provider_id) rootBoolQuery.must(termQuery(provider_id, hyphenToUnderscore(v)))

    for (v <- activityESSearchQuery.activity_type) rootBoolQuery.must(termQuery(activity_type, hyphenToUnderscore(v)))

    for (v <- activityESSearchQuery.publish_at) rootBoolQuery.must(rangeQuery(published_at).gte(v.from.toString()).lte(v.to.toString()))

    for (v <- activityESSearchQuery.publisher) rootBoolQuery.must(termQuery(publisher, hyphenToUnderscore(v)))

    for (v <- activityESSearchQuery.text) rootBoolQuery.must(matchQuery(text, v))

    for (v <- activityESSearchQuery.title) rootBoolQuery.must(matchQuery(title, v))

    for (v <- activityESSearchQuery.url) rootBoolQuery.must(termQuery(url, v))

    for (v <- activityESSearchQuery.audienceComponents) {
      val componentBoolQueryBuilder: BoolQueryBuilder = new BoolQueryBuilder()
      v.foreach(component => componentBoolQueryBuilder.should(matchQuery(audience_components, component)))
      rootBoolQuery.must(componentBoolQueryBuilder)
    }

    for (v <- activityESSearchQuery.resolvedUsers) {
      val resolvedUsersBoolQueryBuilder: BoolQueryBuilder = new BoolQueryBuilder()
      v.foreach(resolvedUser => resolvedUsersBoolQueryBuilder.should(termQuery(resolved_users, resolvedUser)))
      rootBoolQuery.must(resolvedUsersBoolQueryBuilder)
    }

    rootBoolQuery
  }

}

object ActivityESServiceIndexHelper extends ActivityESServiceHelper {

  def makeIndexRequest(indexName: String, docType: String, docId: String, docSource: XContentBuilder): IndexRequest = {
    new IndexRequest(indexName, docType, docId).source(docSource)
  }
}

object ActivityESServiceHelper extends ActivityESServiceHelper