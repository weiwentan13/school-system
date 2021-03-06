# Generated by Django 3.1.7 on 2021-02-23 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.CharField(max_length=15, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='id',
            field=models.CharField(max_length=15, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='salary',
            field=models.IntegerField(default=0),
        ),
    ]
